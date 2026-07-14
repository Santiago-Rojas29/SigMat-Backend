import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TenantService } from 'src/common/tenant/tenant.service';

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
    private readonly tenant: TenantService,
  ) {}

  // NULL = Root, ve todo (los `IS NULL OR` de cada query dejan pasar todo);
  // un uuid real = solo esa sede.
  private get sede(): string | null {
    return this.tenant.isRoot ? null : this.tenant.tenantId;
  }

  private get cacheTenantKey(): string {
    return this.tenant.isRoot ? 'root' : this.tenant.tenantId!;
  }

  async getStats() {
    const KEY = `dashboard:stats:${this.cacheTenantKey}`;
    const cached = await this.cache.get(KEY);
    if (cached) return cached;

    const sede = this.sede;
    const [
      kpis,
      materialesNoDevueltos,
      materialesSolicitados,
      usuariosMorosos,
      incidenciasTipo,
      stockCritico,
    ] = await Promise.all([
      this.getKpis(sede),
      this.getMaterialesNoDevueltos(sede),
      this.getMaterialesMasSolicitados(sede),
      this.getUsuariosMorosos(sede),
      this.getIncidenciasPorTipo(sede),
      this.getStockCritico(sede),
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
    const KEY = `dashboard:solicitudes-anio:${anio}:${this.cacheTenantKey}`;
    const cached = await this.cache.get<{ mes: number; total: number }[]>(KEY);
    if (cached) return cached;

    const rows: { mes: string; total: string }[] = await this.dataSource.query(
      `SELECT EXTRACT(MONTH FROM fecha_solicitud)::int AS mes, COUNT(*) AS total
       FROM solicitud
       WHERE EXTRACT(YEAR FROM fecha_solicitud) = $1
         AND ($2::uuid IS NULL OR id_sede = $2)
       GROUP BY mes
       ORDER BY mes`,
      [anio, this.sede],
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
    const KEY = `dashboard:solicitudes-dia:${anio}-${mes}:${this.cacheTenantKey}`;
    const cached = await this.cache.get<{ dia: number; total: number }[]>(KEY);
    if (cached) return cached;

    const rows: { dia: string; total: string }[] = await this.dataSource.query(
      `SELECT EXTRACT(DAY FROM fecha_solicitud)::int AS dia, COUNT(*) AS total
       FROM solicitud
       WHERE EXTRACT(YEAR  FROM fecha_solicitud) = $1
         AND EXTRACT(MONTH FROM fecha_solicitud) = $2
         AND ($3::uuid IS NULL OR id_sede = $3)
       GROUP BY dia
       ORDER BY dia`,
      [anio, mes, this.sede],
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

  private async getKpis(sede: string | null) {
    const results = await Promise.all([
      this.dataSource.query(`SELECT COUNT(*) as total FROM material WHERE ($1::uuid IS NULL OR id_sede = $1)`, [sede]),
      this.dataSource.query(`SELECT COUNT(*) as total FROM prestamo WHERE estado = 'activo' AND ($1::uuid IS NULL OR id_sede = $1)`, [sede]),
      this.dataSource.query(
        `SELECT COUNT(*) as total FROM prestamo WHERE estado = 'activo' AND fecha_limite < NOW() AND ($1::uuid IS NULL OR id_sede = $1)`,
        [sede],
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as total FROM solicitud
         WHERE estado IN ('pendiente_instructor','pendiente_admin','pendiente_bodega')
           AND ($1::uuid IS NULL OR id_sede = $1)`,
        [sede],
      ),
      this.dataSource.query(`SELECT COUNT(*) as total FROM incidencia WHERE estado != 'cerrada' AND ($1::uuid IS NULL OR id_sede = $1)`, [sede]),
      this.dataSource.query(
        `SELECT COUNT(*) as total FROM lote
         WHERE cantidad_disponible <= CEIL(cantidad_inicial * 0.25) AND cantidad_inicial > 0
           AND ($1::uuid IS NULL OR id_sede = $1)`,
        [sede],
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

  private async getMaterialesNoDevueltos(sede: string | null): Promise<{ nombre: string; total: number }[]> {
    const rows: { nombre: string; total: string }[] = await this.dataSource.query(`
      SELECT m.nombre, COUNT(u.id_unidad) AS total
      FROM unidad u
      JOIN material m ON u.id_material = m.id
      WHERE u.estado = 'prestado'
        AND ($1::uuid IS NULL OR u.id_sede = $1)
      GROUP BY m.id, m.nombre
      ORDER BY total DESC
      LIMIT 10
    `, [sede]);
    return rows.map((r) => ({ nombre: r.nombre, total: Number(r.total) }));
  }

  private async getMaterialesMasSolicitados(sede: string | null): Promise<{ nombre: string; total: number }[]> {
    const rows: { nombre: string; total: string }[] = await this.dataSource.query(`
      WITH sol_material AS (
        SELECT m.nombre, sl.id_solicitud
        FROM solicitud_lote sl
        JOIN lote     l ON sl.id_lote     = l.id_lote
        JOIN material m ON l.id_material  = m.id
        WHERE ($1::uuid IS NULL OR l.id_sede = $1)
        UNION ALL
        SELECT m.nombre, su.id_solicitud
        FROM solicitud_unidad su
        JOIN unidad   u ON su.id_unidad   = u.id_unidad
        JOIN material m ON u.id_material  = m.id
        WHERE ($1::uuid IS NULL OR u.id_sede = $1)
      )
      SELECT nombre, COUNT(DISTINCT id_solicitud) AS total
      FROM sol_material
      GROUP BY nombre
      ORDER BY total DESC
      LIMIT 8
    `, [sede]);
    return rows.map((r) => ({ nombre: r.nombre, total: Number(r.total) }));
  }

  private async getUsuariosMorosos(sede: string | null): Promise<
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
        AND ($1::uuid IS NULL OR p.id_sede = $1)
      GROUP BY u.id, u.nombres, u.apellidos, u.correo
      ORDER BY prestamos_vencidos DESC
      LIMIT 10
    `, [sede]);
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

  private async getIncidenciasPorTipo(sede: string | null): Promise<{ tipo: string; total: number }[]> {
    const rows: { tipo: string; total: string }[] = await this.dataSource.query(
      `SELECT tipo, COUNT(*) AS total FROM incidencia
       WHERE ($1::uuid IS NULL OR id_sede = $1)
       GROUP BY tipo ORDER BY total DESC`,
      [sede],
    );
    return rows.map((r) => ({ tipo: r.tipo, total: Number(r.total) }));
  }

  async getStatsPersonal(userId: string) {
    const KEY = `dashboard:personal:${userId}`;
    const cached = await this.cache.get(KEY);
    if (cached) return cached;

    const [solicitudesRaw, prestamosRaw, vencidosRaw, proximosRaw, ultimasRaw] = await Promise.all([
      this.dataSource.query(
        `SELECT estado, COUNT(*) AS total FROM solicitud WHERE id_solicitante = $1 GROUP BY estado`,
        [userId],
      ),
      this.dataSource.query(
        `SELECT COUNT(*) AS total FROM prestamo WHERE id_usuario = $1 AND estado = 'activo'`,
        [userId],
      ),
      this.dataSource.query(
        `SELECT COUNT(*) AS total FROM prestamo WHERE id_usuario = $1 AND estado = 'activo' AND fecha_limite < NOW()`,
        [userId],
      ),
      this.dataSource.query(
        `SELECT COUNT(*) AS total FROM prestamo
         WHERE id_usuario = $1 AND estado = 'activo'
           AND fecha_limite BETWEEN NOW() AND NOW() + INTERVAL '3 days'`,
        [userId],
      ),
      this.dataSource.query(
        `SELECT s.id_solicitud, s.estado, s.fecha_solicitud, s.observaciones
         FROM solicitud s WHERE s.id_solicitante = $1
         ORDER BY s.fecha_solicitud DESC LIMIT 5`,
        [userId],
      ),
    ]);

    const solicitudesPorEstado: Record<string, number> = {};
    for (const row of solicitudesRaw as { estado: string; total: string }[]) {
      solicitudesPorEstado[row.estado] = Number(row.total);
    }

    const result = {
      solicitudesPorEstado,
      prestamosActivos:    Number((prestamosRaw as { total: string }[])[0]?.total ?? 0),
      prestamosVencidos:   Number((vencidosRaw  as { total: string }[])[0]?.total ?? 0),
      proximosAVencer:     Number((proximosRaw  as { total: string }[])[0]?.total ?? 0),
      ultimasSolicitudes:  (ultimasRaw as { id_solicitud: string; estado: string; fecha_solicitud: Date; observaciones: string | null }[])
        .map(r => ({ id: r.id_solicitud, estado: r.estado, fecha_solicitud: r.fecha_solicitud, motivo: r.observaciones })),
    };

    await this.cache.set(KEY, result, 60_000); // 1 min — datos personales cambian más seguido
    return result;
  }

  async getStatsRoot() {
    const KEY = 'dashboard:root';
    const cached = await this.cache.get(KEY);
    if (cached) return cached;

    const [centrosRaw, sedesRaw, adminsRaw, usuariosRaw, usuariosPorRolRaw] = await Promise.all([
      this.dataSource.query(`SELECT COUNT(*) AS total FROM centro WHERE estado = 'activo'`),
      this.dataSource.query(`SELECT COUNT(*) AS total FROM sede WHERE estado = 'activo'`),
      this.dataSource.query(
        `SELECT COUNT(*) AS total FROM usuario u
         JOIN rol r ON u.id_rol = r.id
         WHERE r.nombre = 'Administrador' AND u.estado = 'activo'`,
      ),
      this.dataSource.query(`SELECT COUNT(*) AS total FROM usuario WHERE estado = 'activo'`),
      this.dataSource.query(
        `SELECT r.nombre AS rol, COUNT(u.id) AS total
         FROM usuario u JOIN rol r ON u.id_rol = r.id
         WHERE u.estado = 'activo'
         GROUP BY r.nombre ORDER BY total DESC`,
      ),
    ]);

    const result = {
      centrosActivos:     Number((centrosRaw   as { total: string }[])[0]?.total ?? 0),
      sedesActivas:       Number((sedesRaw     as { total: string }[])[0]?.total ?? 0),
      administradores:    Number((adminsRaw    as { total: string }[])[0]?.total ?? 0),
      usuariosActivos:    Number((usuariosRaw  as { total: string }[])[0]?.total ?? 0),
      usuariosPorRol:     (usuariosPorRolRaw as { rol: string; total: string }[]).map(r => ({
        rol: r.rol, total: Number(r.total),
      })),
    };

    await this.cache.set(KEY, result, TTL_STATS);
    return result;
  }

  private async getStockCritico(sede: string | null): Promise<
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
        AND ($1::uuid IS NULL OR l.id_sede = $1)
      ORDER BY (CAST(l.cantidad_disponible AS FLOAT) / NULLIF(l.cantidad_inicial, 0)) ASC
      LIMIT 8
    `, [sede]);
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

  // Root elige una sede puntual y ve su info + el mismo tablero que vería un admin de esa sede.
  async getStatsPorSede(idSede: string) {
    const KEY = `dashboard:stats:sede-detalle:${idSede}`;
    const cached = await this.cache.get(KEY);
    if (cached) return cached;

    const [
      sedeRaw,
      usuariosActivosRaw,
      usuariosPorRolRaw,
      kpis,
      materialesNoDevueltos,
      materialesSolicitados,
      usuariosMorosos,
      incidenciasTipo,
      stockCritico,
    ] = await Promise.all([
      this.dataSource.query(
        `SELECT s.nombre, s.direccion, s.telefono, s.estado, c.nombre AS centro
         FROM sede s JOIN centro c ON s.id_centro = c.id
         WHERE s.id_sede = $1`,
        [idSede],
      ),
      this.dataSource.query(
        `SELECT COUNT(*) AS total FROM usuario WHERE id_sede = $1 AND estado = 'activo'`,
        [idSede],
      ),
      this.dataSource.query(
        `SELECT r.nombre AS rol, COUNT(u.id) AS total
         FROM usuario u JOIN rol r ON u.id_rol = r.id
         WHERE u.id_sede = $1 AND u.estado = 'activo'
         GROUP BY r.nombre ORDER BY total DESC`,
        [idSede],
      ),
      this.getKpis(idSede),
      this.getMaterialesNoDevueltos(idSede),
      this.getMaterialesMasSolicitados(idSede),
      this.getUsuariosMorosos(idSede),
      this.getIncidenciasPorTipo(idSede),
      this.getStockCritico(idSede),
    ]);

    const sedeInfo = (sedeRaw as { nombre: string; direccion: string | null; telefono: string | null; estado: string; centro: string }[])[0] ?? null;

    const result = {
      sede: sedeInfo,
      usuariosActivos: Number((usuariosActivosRaw as { total: string }[])[0]?.total ?? 0),
      usuariosPorRol: (usuariosPorRolRaw as { rol: string; total: string }[]).map((r) => ({
        rol: r.rol, total: Number(r.total),
      })),
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
}
