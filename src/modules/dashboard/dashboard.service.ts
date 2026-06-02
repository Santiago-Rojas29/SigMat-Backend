import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

const TTL_STATS   = 5  * 60 * 1000; // 5 min
const TTL_ANIO    = 30 * 60 * 1000; // 30 min
const TTL_DIA     = 15 * 60 * 1000; // 15 min

@Injectable()
export class DashboardService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  async getStats() {
    const KEY = 'dashboard:stats';
    const cached = await this.cache.get(KEY);
    if (cached) return cached;

    const [
      kpis,
      materialesNoDevueltos,
      materialesSolicitados,
      usuariosMorosos,
      incidenciasTipo,
      stockCritico,
    ] = await Promise.all([
      this.getKpis(),
      this.getMaterialesNoDevueltos(),
      this.getMaterialesMasSolicitados(),
      this.getUsuariosMorosos(),
      this.getIncidenciasPorTipo(),
      this.getStockCritico(),
    ]);

    const result = {
      kpis,
      materialesNoDevueltos,
      materialesSolicitados,
      usuariosMorosos,
      incidenciasTipo,
      stockCritico,
    };

    await this.cache.set(KEY, result, TTL_STATS);
    return result;
  }

  async getSolicitudesPorAnio(anio: number): Promise<{ mes: number; total: number }[]> {
    const KEY = `dashboard:solicitudes-anio:${anio}`;
    const cached = await this.cache.get<{ mes: number; total: number }[]>(KEY);
    if (cached) return cached;

    const rows: { mes: string; total: string }[] = await this.dataSource.query(
      `SELECT EXTRACT(MONTH FROM fecha_solicitud)::int AS mes, COUNT(*) AS total
       FROM solicitud
       WHERE EXTRACT(YEAR FROM fecha_solicitud) = $1
       GROUP BY mes
       ORDER BY mes`,
      [anio],
    );
    const map = new Map(rows.map((r) => [Number(r.mes), Number(r.total)]));
    const result = Array.from({ length: 12 }, (_, i) => ({
      mes: i + 1,
      total: map.get(i + 1) ?? 0,
    }));

    await this.cache.set(KEY, result, TTL_ANIO);
    return result;
  }

  async getSolicitudesPorDia(anio: number, mes: number): Promise<{ dia: number; total: number }[]> {
    const KEY = `dashboard:solicitudes-dia:${anio}-${mes}`;
    const cached = await this.cache.get<{ dia: number; total: number }[]>(KEY);
    if (cached) return cached;

    const rows: { dia: string; total: string }[] = await this.dataSource.query(
      `SELECT EXTRACT(DAY FROM fecha_solicitud)::int AS dia, COUNT(*) AS total
       FROM solicitud
       WHERE EXTRACT(YEAR  FROM fecha_solicitud) = $1
         AND EXTRACT(MONTH FROM fecha_solicitud) = $2
       GROUP BY dia
       ORDER BY dia`,
      [anio, mes],
    );
    const daysInMonth = new Date(anio, mes, 0).getDate();
    const map = new Map(rows.map((r) => [Number(r.dia), Number(r.total)]));
    const result = Array.from({ length: daysInMonth }, (_, i) => ({
      dia: i + 1,
      total: map.get(i + 1) ?? 0,
    }));

    await this.cache.set(KEY, result, TTL_DIA);
    return result;
  }

  private async getKpis() {
    const results = await Promise.all([
      this.dataSource.query(`SELECT COUNT(*) as total FROM material`),
      this.dataSource.query(`SELECT COUNT(*) as total FROM prestamo WHERE estado = 'activo'`),
      this.dataSource.query(
        `SELECT COUNT(*) as total FROM prestamo WHERE estado = 'activo' AND fecha_limite < NOW()`,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as total FROM solicitud
         WHERE estado IN ('pendiente_instructor','pendiente_admin','pendiente_bodega')`,
      ),
      this.dataSource.query(`SELECT COUNT(*) as total FROM incidencia WHERE estado != 'cerrada'`),
      this.dataSource.query(
        `SELECT COUNT(*) as total FROM lote
         WHERE cantidad_disponible <= CEIL(cantidad_inicial * 0.25) AND cantidad_inicial > 0`,
      ),
    ]);
    const [mats, presActivos, presVencidos, solPend, incActivas, lotesStock] = results.map(
      (r: { total: string }[]) => r[0],
    );
    return {
      total_materiales: Number(mats.total),
      total_prestamos_activos: Number(presActivos.total),
      total_prestamos_vencidos: Number(presVencidos.total),
      total_solicitudes_pendientes: Number(solPend.total),
      total_incidencias_activas: Number(incActivas.total),
      total_lotes_stock_critico: Number(lotesStock.total),
    };
  }

  private async getMaterialesNoDevueltos(): Promise<{ nombre: string; total: number }[]> {
    const rows: { nombre: string; total: string }[] = await this.dataSource.query(`
      SELECT m.nombre, COUNT(u.id_unidad) AS total
      FROM unidad u
      JOIN material m ON u.id_material = m.id
      WHERE u.estado = 'prestado'
      GROUP BY m.id, m.nombre
      ORDER BY total DESC
      LIMIT 10
    `);
    return rows.map((r) => ({ nombre: r.nombre, total: Number(r.total) }));
  }

  private async getMaterialesMasSolicitados(): Promise<{ nombre: string; total: number }[]> {
    const rows: { nombre: string; total: string }[] = await this.dataSource.query(`
      WITH sol_material AS (
        SELECT m.nombre, sl.id_solicitud
        FROM solicitud_lote sl
        JOIN lote     l ON sl.id_lote     = l.id_lote
        JOIN material m ON l.id_material  = m.id
        UNION ALL
        SELECT m.nombre, su.id_solicitud
        FROM solicitud_unidad su
        JOIN unidad   u ON su.id_unidad   = u.id_unidad
        JOIN material m ON u.id_material  = m.id
      )
      SELECT nombre, COUNT(DISTINCT id_solicitud) AS total
      FROM sol_material
      GROUP BY nombre
      ORDER BY total DESC
      LIMIT 8
    `);
    return rows.map((r) => ({ nombre: r.nombre, total: Number(r.total) }));
  }

  private async getUsuariosMorosos(): Promise<
    { nombre: string; correo: string; prestamos_vencidos: number; dias_vencido: number }[]
  > {
    const rows: {
      nombres: string;
      apellidos: string;
      correo: string;
      prestamos_vencidos: string;
      fecha_mas_antigua: Date;
    }[] = await this.dataSource.query(`
      SELECT u.nombres, u.apellidos, u.correo,
             COUNT(p.id) AS prestamos_vencidos,
             MIN(p.fecha_limite) AS fecha_mas_antigua
      FROM prestamo p
      JOIN usuario u ON p.id_usuario = u.id
      WHERE p.estado = 'activo' AND p.fecha_limite < NOW()
      GROUP BY u.id, u.nombres, u.apellidos, u.correo
      ORDER BY prestamos_vencidos DESC
      LIMIT 10
    `);
    return rows.map((r) => ({
      nombre: `${r.nombres} ${r.apellidos}`,
      correo: r.correo,
      prestamos_vencidos: Number(r.prestamos_vencidos),
      dias_vencido: Math.max(
        0,
        Math.floor((Date.now() - new Date(r.fecha_mas_antigua).getTime()) / 86_400_000),
      ),
    }));
  }

  private async getIncidenciasPorTipo(): Promise<{ tipo: string; total: number }[]> {
    const rows: { tipo: string; total: string }[] = await this.dataSource.query(
      `SELECT tipo, COUNT(*) AS total FROM incidencia GROUP BY tipo ORDER BY total DESC`,
    );
    return rows.map((r) => ({ tipo: r.tipo, total: Number(r.total) }));
  }

  private async getStockCritico(): Promise<
    { nombre: string; codigo_lote: string; disponible: number; inicial: number; porcentaje: number }[]
  > {
    const rows: {
      nombre: string;
      codigo_lote: string;
      cantidad_disponible: string;
      cantidad_inicial: string;
    }[] = await this.dataSource.query(`
      SELECT m.nombre, l.codigo_lote, l.cantidad_disponible, l.cantidad_inicial
      FROM lote l
      JOIN material m ON l.id_material = m.id
      WHERE l.cantidad_disponible <= CEIL(l.cantidad_inicial * 0.25) AND l.cantidad_inicial > 0
      ORDER BY (CAST(l.cantidad_disponible AS FLOAT) / NULLIF(l.cantidad_inicial, 0)) ASC
      LIMIT 8
    `);
    return rows.map((r) => {
      const disponible = Number(r.cantidad_disponible);
      const inicial = Number(r.cantidad_inicial);
      return {
        nombre: r.nombre,
        codigo_lote: r.codigo_lote,
        disponible,
        inicial,
        porcentaje: Math.round((disponible / inicial) * 100),
      };
    });
  }
}
