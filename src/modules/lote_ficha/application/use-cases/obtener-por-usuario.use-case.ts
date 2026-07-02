import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export interface LoteDisponibleParaUsuario {
  tipo: 'ficha' | 'libre';
  id_lote_ficha: string | null;  // null si es lote libre
  id_lote: string;
  id_ficha: string | null;
  codigo_ficha: string | null;
  cantidad_disponible: number;   // cuota de ficha o cantidad_disponible del lote
  codigo_lote: string;
  unidad_medida: string;
  fecha_entrada: Date;
  estado_lote: string | null;
  id_material: string;
  nombre_material: string;
  descripcion_material: string | null;
}

@Injectable()
export class ObtenerLotesPorUsuarioUseCase {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute(userId: string): Promise<LoteDisponibleParaUsuario[]> {
    // 1. Lotes asignados a la ficha del usuario
    const fichaRows: any[] = await this.dataSource.query(
      `SELECT
         'ficha'          AS tipo,
         lf.id            AS id_lote_ficha,
         lf.id_lote,
         lf.id_ficha,
         f.codigo_ficha,
         lf.cantidad      AS cantidad_disponible,
         l.codigo_lote,
         l.unidad_medida,
         l.fecha_entrada,
         l.estado         AS estado_lote,
         m.id             AS id_material,
         m.nombre         AS nombre_material,
         m.descripcion    AS descripcion_material
       FROM lote_ficha lf
       JOIN ficha_usuario fu ON fu.id_ficha = lf.id_ficha
       JOIN ficha f          ON f.id_ficha  = lf.id_ficha
       JOIN lote l           ON l.id_lote   = lf.id_lote
       JOIN material m       ON m.id        = l.id_material
       WHERE fu.id_usuario = $1
         AND lf.cantidad > 0
         AND (l.estado IS NULL OR l.estado NOT IN ('vencido', 'deteriorado'))`,
      [userId],
    );

    // 2. Lotes libres (sin ninguna asignación de ficha) con stock disponible
    const libresRows: any[] = await this.dataSource.query(
      `SELECT
         'libre'          AS tipo,
         NULL             AS id_lote_ficha,
         l.id_lote,
         NULL             AS id_ficha,
         NULL             AS codigo_ficha,
         l.cantidad_disponible,
         l.codigo_lote,
         l.unidad_medida,
         l.fecha_entrada,
         l.estado         AS estado_lote,
         m.id             AS id_material,
         m.nombre         AS nombre_material,
         m.descripcion    AS descripcion_material
       FROM lote l
       JOIN material m ON m.id = l.id_material
       WHERE l.cantidad_disponible > 0
         AND (l.estado IS NULL OR l.estado NOT IN ('vencido', 'deteriorado'))
         AND NOT EXISTS (
           SELECT 1 FROM lote_ficha lf2 WHERE lf2.id_lote = l.id_lote
         )`,
      [],
    );

    const toResult = (r: any): LoteDisponibleParaUsuario => ({
      tipo:                r.tipo,
      id_lote_ficha:       r.id_lote_ficha ?? null,
      id_lote:             r.id_lote,
      id_ficha:            r.id_ficha ?? null,
      codigo_ficha:        r.codigo_ficha ?? null,
      cantidad_disponible: Number(r.cantidad_disponible),
      codigo_lote:         r.codigo_lote,
      unidad_medida:       r.unidad_medida,
      fecha_entrada:       r.fecha_entrada,
      estado_lote:         r.estado_lote ?? null,
      id_material:         r.id_material,
      nombre_material:     r.nombre_material,
      descripcion_material: r.descripcion_material ?? null,
    })

    return [...fichaRows.map(toResult), ...libresRows.map(toResult)]
      .sort((a, b) => a.nombre_material.localeCompare(b.nombre_material))
  }
}
