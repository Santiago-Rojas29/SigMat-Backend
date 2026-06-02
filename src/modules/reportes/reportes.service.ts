import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ReportesService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  // ── 1. Solicitudes ────────────────────────────────────────────────────────
  async getSolicitudes(filtros: {
    desde?: string; hasta?: string; estado?: string; tipo_flujo?: string;
  }) {
    const conditions: string[] = [];
    const params: any[] = [];
    let i = 1;

    if (filtros.desde) { conditions.push(`s.fecha_solicitud >= $${i++}`); params.push(filtros.desde); }
    if (filtros.hasta) { conditions.push(`s.fecha_solicitud <= $${i++}`); params.push(filtros.hasta + 'T23:59:59'); }
    if (filtros.estado) { conditions.push(`s.estado = $${i++}`); params.push(filtros.estado); }
    if (filtros.tipo_flujo) { conditions.push(`s.tipo_flujo = $${i++}`); params.push(filtros.tipo_flujo); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const rows: any[] = await this.dataSource.query(`
      SELECT
        s.id_solicitud,
        s.fecha_solicitud,
        s.estado,
        s.tipo_flujo,
        s.tipo_prestamo,
        s.observaciones,
        s.motivo_rechazo,
        s.fecha_entrega,
        CONCAT(u.nombres, ' ', u.apellidos) AS solicitante,
        u.correo AS correo_solicitante,
        CONCAT(inst.nombres, ' ', inst.apellidos) AS instructor,
        s.fecha_respuesta_instructor,
        s.fecha_respuesta_admin,
        s.fecha_respuesta_bodega
      FROM solicitud s
      JOIN usuario u ON s.id_solicitante = u.id
      LEFT JOIN usuario inst ON s.id_instructor = inst.id
      ${where}
      ORDER BY s.fecha_solicitud DESC
      LIMIT 500
    `, params);

    const fmt = (d: any) => d ? new Date(d).toLocaleDateString('es-CO') : '—';
    return rows.map(r => ({
      ...r,
      fecha_solicitud: fmt(r.fecha_solicitud),
      fecha_entrega: fmt(r.fecha_entrega),
      fecha_respuesta_instructor: fmt(r.fecha_respuesta_instructor),
      fecha_respuesta_admin: fmt(r.fecha_respuesta_admin),
      fecha_respuesta_bodega: fmt(r.fecha_respuesta_bodega),
    }));
  }

  // ── 2. Stock crítico ──────────────────────────────────────────────────────
  async getStockCritico(umbral = 25) {
    const rows: any[] = await this.dataSource.query(`
      SELECT
        m.nombre AS material,
        m.categoria,
        m.unidad_medida,
        l.codigo_lote,
        l.cantidad_disponible::int AS cantidad_disponible,
        l.cantidad_inicial::int AS cantidad_inicial,
        ROUND(CAST(l.cantidad_disponible AS FLOAT) / NULLIF(l.cantidad_inicial, 0) * 100)::int AS porcentaje,
        ub.nombre AS ubicacion,
        l.estado
      FROM lote l
      JOIN material m ON l.id_material = m.id
      LEFT JOIN ubicacion ub ON l.id_ubicacion = ub.id_ubicacion
      WHERE l.cantidad_disponible <= CEIL(l.cantidad_inicial * $1::float / 100)
        AND l.cantidad_inicial > 0
      ORDER BY porcentaje ASC
    `, [umbral]);
    return rows;
  }

  // ── 3. Lotes próximos a vencer ────────────────────────────────────────────
  async getLotesVencimiento(dias = 30) {
    const rows: any[] = await this.dataSource.query(`
      SELECT
        l.codigo_lote,
        m.nombre AS material,
        m.categoria,
        l.cantidad_disponible::int AS cantidad_disponible,
        m.unidad_medida,
        l.fecha_vencimiento,
        l.estado,
        ub.nombre AS ubicacion,
        CEIL(EXTRACT(EPOCH FROM (l.fecha_vencimiento - NOW())) / 86400)::int AS dias_para_vencer
      FROM lote l
      JOIN material m ON l.id_material = m.id
      LEFT JOIN ubicacion ub ON l.id_ubicacion = ub.id_ubicacion
      WHERE l.fecha_vencimiento IS NOT NULL
        AND l.fecha_vencimiento <= NOW() + ($1 || ' days')::interval
      ORDER BY l.fecha_vencimiento ASC
    `, [dias]);

    return rows.map(r => ({
      ...r,
      fecha_vencimiento: r.fecha_vencimiento
        ? new Date(r.fecha_vencimiento).toLocaleDateString('es-CO') : '—',
    }));
  }

  // ── 4. Morosos ────────────────────────────────────────────────────────────
  async getMorosos() {
    const rows: any[] = await this.dataSource.query(`
      SELECT
        CONCAT(u.nombres, ' ', u.apellidos) AS usuario,
        u.correo,
        COUNT(p.id)::int AS prestamos_vencidos,
        MIN(p.fecha_limite) AS fecha_mas_antigua,
        CEIL((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM MIN(p.fecha_limite))) / 86400)::int AS dias_vencido
      FROM prestamo p
      JOIN usuario u ON p.id_usuario = u.id
      WHERE p.estado = 'activo' AND p.fecha_limite < NOW()
      GROUP BY u.id, u.nombres, u.apellidos, u.correo
      ORDER BY prestamos_vencidos DESC
    `);
    return rows.map(r => ({
      ...r,
      fecha_mas_antigua: r.fecha_mas_antigua
        ? new Date(r.fecha_mas_antigua).toLocaleDateString('es-CO') : '—',
    }));
  }

  // ── 5. Kardex ─────────────────────────────────────────────────────────────
  async getKardex(filtros: { desde?: string; hasta?: string; tipo_movimiento?: string }) {
    const conditions: string[] = [];
    const params: any[] = [];
    let i = 1;

    if (filtros.desde) { conditions.push(`k.fecha_movimiento >= $${i++}`); params.push(filtros.desde); }
    if (filtros.hasta) { conditions.push(`k.fecha_movimiento <= $${i++}`); params.push(filtros.hasta + 'T23:59:59'); }
    if (filtros.tipo_movimiento) { conditions.push(`k.tipo_movimiento = $${i++}`); params.push(filtros.tipo_movimiento); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const rows: any[] = await this.dataSource.query(`
      SELECT
        k.fecha_movimiento,
        k.tipo_movimiento,
        k.cantidad::int AS cantidad,
        k.saldo::int AS saldo,
        COALESCE(ml.nombre, mu.nombre) AS material,
        COALESCE(l.codigo_lote, u.codigo_unidad) AS codigo,
        CASE WHEN k.id_lote IS NOT NULL THEN 'Lote' ELSE 'Unidad' END AS tipo_item
      FROM kardex k
      LEFT JOIN lote l ON k.id_lote = l.id_lote
      LEFT JOIN material ml ON l.id_material = ml.id
      LEFT JOIN unidad u ON k.id_unidad = u.id_unidad
      LEFT JOIN material mu ON u.id_material = mu.id
      ${where}
      ORDER BY k.fecha_movimiento DESC
      LIMIT 500
    `, params);

    return rows.map(r => ({
      ...r,
      fecha_movimiento: r.fecha_movimiento
        ? new Date(r.fecha_movimiento).toLocaleDateString('es-CO') : '—',
    }));
  }

  // ── 6. Incidencias ────────────────────────────────────────────────────────
  async getIncidencias(filtros: {
    estado?: string; tipo?: string; desde?: string; hasta?: string;
  }) {
    const conditions: string[] = [];
    const params: any[] = [];
    let i = 1;

    if (filtros.estado) { conditions.push(`i.estado = $${i++}`); params.push(filtros.estado); }
    if (filtros.tipo) { conditions.push(`i.tipo = $${i++}`); params.push(filtros.tipo); }
    if (filtros.desde) { conditions.push(`i.fecha_incidencia >= $${i++}`); params.push(filtros.desde); }
    if (filtros.hasta) { conditions.push(`i.fecha_incidencia <= $${i++}`); params.push(filtros.hasta + 'T23:59:59'); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const rows: any[] = await this.dataSource.query(`
      SELECT
        i.tipo,
        i.estado,
        i.descripcion,
        i.fecha_incidencia,
        m.nombre AS material,
        u.codigo_unidad,
        CONCAT(usr.nombres, ' ', usr.apellidos) AS responsable,
        usr.correo
      FROM incidencia i
      JOIN unidad u ON i.id_unidad = u.id_unidad
      JOIN material m ON u.id_material = m.id
      JOIN usuario usr ON i.id_usuario = usr.id
      ${where}
      ORDER BY i.fecha_incidencia DESC
    `, params);

    return rows.map(r => ({
      ...r,
      fecha_incidencia: r.fecha_incidencia
        ? new Date(r.fecha_incidencia).toLocaleDateString('es-CO') : '—',
    }));
  }

  // ── 7. Resumen general ────────────────────────────────────────────────────
  async getResumen(filtros: { desde?: string; hasta?: string }) {
    const desde = filtros.desde ?? new Date(new Date().getFullYear(), 0, 1).toISOString();
    const hasta = filtros.hasta
      ? filtros.hasta + 'T23:59:59'
      : new Date().toISOString();

    const [kpis, solicitudesPorEstado, topMateriales, incidenciasTipo, stockCritico] =
      await Promise.all([
        this.dataSource.query(`
          SELECT
            (SELECT COUNT(*) FROM solicitud WHERE fecha_solicitud BETWEEN $1 AND $2)::int AS total_solicitudes,
            (SELECT COUNT(*) FROM solicitud WHERE estado='entregado' AND fecha_solicitud BETWEEN $1 AND $2)::int AS entregadas,
            (SELECT COUNT(*) FROM solicitud WHERE estado='rechazado' AND fecha_solicitud BETWEEN $1 AND $2)::int AS rechazadas,
            (SELECT COUNT(*) FROM prestamo WHERE estado='activo')::int AS prestamos_activos,
            (SELECT COUNT(*) FROM prestamo WHERE estado='activo' AND fecha_limite < NOW())::int AS prestamos_vencidos,
            (SELECT COUNT(*) FROM incidencia WHERE fecha_incidencia BETWEEN $1 AND $2)::int AS total_incidencias,
            (SELECT COUNT(*) FROM material)::int AS total_materiales,
            (SELECT COUNT(*) FROM lote WHERE cantidad_disponible <= CEIL(cantidad_inicial*0.25) AND cantidad_inicial>0)::int AS lotes_stock_critico
        `, [desde, hasta]),

        this.dataSource.query(`
          SELECT estado, COUNT(*)::int AS total
          FROM solicitud WHERE fecha_solicitud BETWEEN $1 AND $2
          GROUP BY estado ORDER BY total DESC
        `, [desde, hasta]),

        this.dataSource.query(`
          WITH sol_mat AS (
            SELECT m.nombre, sl.id_solicitud
            FROM solicitud_lote sl
            JOIN lote l ON sl.id_lote = l.id_lote
            JOIN material m ON l.id_material = m.id
            JOIN solicitud s ON sl.id_solicitud = s.id_solicitud
            WHERE s.fecha_solicitud BETWEEN $1 AND $2
            UNION ALL
            SELECT m.nombre, su.id_solicitud
            FROM solicitud_unidad su
            JOIN unidad u ON su.id_unidad = u.id_unidad
            JOIN material m ON u.id_material = m.id
            JOIN solicitud s ON su.id_solicitud = s.id_solicitud
            WHERE s.fecha_solicitud BETWEEN $1 AND $2
          )
          SELECT nombre, COUNT(DISTINCT id_solicitud)::int AS total
          FROM sol_mat GROUP BY nombre ORDER BY total DESC LIMIT 10
        `, [desde, hasta]),

        this.dataSource.query(`
          SELECT tipo, COUNT(*)::int AS total
          FROM incidencia WHERE fecha_incidencia BETWEEN $1 AND $2
          GROUP BY tipo ORDER BY total DESC
        `, [desde, hasta]),

        this.getStockCritico(25),
      ]);

    return {
      kpis: kpis[0],
      solicitudesPorEstado,
      topMateriales,
      incidenciasTipo,
      stockCritico,
      periodo: {
        desde: new Date(desde).toLocaleDateString('es-CO'),
        hasta: new Date(hasta).toLocaleDateString('es-CO'),
      },
    };
  }
}
