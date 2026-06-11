import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { KardexAutoService } from '../../../kardex/application/services/kardex-auto.service';
import { Traslado } from '../../domain/entities/traslado.entity';

export interface ItemTraslado {
  tipo: 'unidad' | 'lote';
  id: string;
  cantidad?: number;
}

@Injectable()
export class RealizarTrasladoUseCase {
  constructor(
    @InjectDataSource() private readonly db: DataSource,
    private readonly kardexAuto: KardexAutoService,
  ) {}

  async execute(data: {
    id_responsable: string;
    id_ubicacion_origen: string;
    id_ubicacion_destino: string;
    fecha_traslado: string;
    motivo: string;
    observaciones: string;
    items: ItemTraslado[];
  }): Promise<Traslado> {
    if (!data.items?.length)
      throw new BadRequestException('Debe incluir al menos un ítem para trasladar');

    // 1. Crear registro del traslado
    const [traslado] = await this.db.query<{ id: string }[]>(
      `INSERT INTO traslado
         (id, id_responsable, id_ubicacion_origen, id_ubicacion_destino, fecha_traslado, motivo, observaciones)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        data.id_responsable,
        data.id_ubicacion_origen,
        data.id_ubicacion_destino,
        data.fecha_traslado,
        data.motivo,
        data.observaciones,
      ],
    );
    const id_traslado = traslado.id;

    // 2. Procesar cada ítem
    for (const item of data.items) {
      if (item.tipo === 'unidad') {
        await this.trasladarUnidad(item.id, id_traslado, data.id_ubicacion_destino);
      } else {
        await this.trasladarLote(item.id, item.cantidad ?? 1, id_traslado, data.id_ubicacion_destino);
      }
    }

    return new Traslado(
      id_traslado,
      data.id_responsable,
      data.id_ubicacion_origen,
      data.id_ubicacion_destino,
      new Date(data.fecha_traslado),
      data.motivo,
      data.observaciones,
    );
  }

  private async trasladarUnidad(id_unidad: string, id_traslado: string, id_ubicacion_destino: string): Promise<void> {
    const [unidad] = await this.db.query<{ id_unidad: string }[]>(
      `SELECT id_unidad FROM unidad WHERE id_unidad = $1`, [id_unidad],
    );
    if (!unidad) throw new BadRequestException(`Unidad ${id_unidad} no encontrada`);

    await this.db.query(`UPDATE unidad SET id_ubicacion = $1 WHERE id_unidad = $2`, [id_ubicacion_destino, id_unidad]);
    await this.db.query(
      `INSERT INTO traslado_unidad (id_traslado, id_unidad) VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [id_traslado, id_unidad],
    );
    await this.kardexAuto.trasladoUnidad(id_unidad, id_traslado);
  }

  private async trasladarLote(id_lote: string, cantidad: number, id_traslado: string, id_ubicacion_destino: string): Promise<void> {
    const [lote] = await this.db.query<{
      id_lote: string; cantidad_disponible: number; id_material: string;
      id_responsable: string; codigo_lote: string; unidad_medida: string;
      fecha_entrada: Date; estado: string | null;
    }[]>(
      `SELECT id_lote, cantidad_disponible, id_material, id_responsable,
              codigo_lote, unidad_medida, fecha_entrada, estado
       FROM lote WHERE id_lote = $1`, [id_lote],
    );
    if (!lote) throw new BadRequestException(`Lote ${id_lote} no encontrado`);
    if (lote.cantidad_disponible < cantidad)
      throw new BadRequestException(`El lote no tiene suficiente cantidad (disponible: ${lote.cantidad_disponible})`);

    const saldo_origen = lote.cantidad_disponible - cantidad;
    const esTraslado_total = saldo_origen === 0;

    if (esTraslado_total) {
      // Traslado completo → buscar lote del mismo material en destino para fusionar
      const [loteDestinoTotal] = await this.db.query<{ id_lote: string }[]>(
        `SELECT id_lote FROM lote
         WHERE id_material = $1 AND id_ubicacion = $2 AND id_lote <> $3
         ORDER BY fecha_entrada LIMIT 1`,
        [lote.id_material, id_ubicacion_destino, id_lote],
      );

      if (loteDestinoTotal) {
        // Ya existe: sumar al existente y vaciar el origen
        await this.db.query(
          `UPDATE lote
           SET cantidad_disponible = cantidad_disponible + $1,
               cantidad_inicial    = cantidad_inicial    + $1
           WHERE id_lote = $2`,
          [cantidad, loteDestinoTotal.id_lote],
        );
        await this.db.query(
          `UPDATE lote SET cantidad_disponible = 0 WHERE id_lote = $1`,
          [id_lote],
        );
        await this.kardexAuto.entradaLote(loteDestinoTotal.id_lote, cantidad);
      } else {
        // No existe: mover el lote directamente
        await this.db.query(
          `UPDATE lote SET id_ubicacion = $1 WHERE id_lote = $2`,
          [id_ubicacion_destino, id_lote],
        );
      }
      await this.kardexAuto.trasladoLote(id_lote, cantidad, 0, id_traslado);
    } else {
      // Traslado parcial → reduce origen
      await this.db.query(
        `UPDATE lote SET cantidad_disponible = $1 WHERE id_lote = $2`,
        [saldo_origen, id_lote],
      );
      await this.kardexAuto.trasladoLote(id_lote, cantidad, saldo_origen, id_traslado);

      // Buscar lote del mismo material en destino para fusionar
      const [loteDestino] = await this.db.query<{ id_lote: string }[]>(
        `SELECT id_lote FROM lote
         WHERE id_material = $1 AND id_ubicacion = $2 AND id_lote <> $3
         ORDER BY fecha_entrada LIMIT 1`,
        [lote.id_material, id_ubicacion_destino, id_lote],
      );

      if (loteDestino) {
        // Ya existe: sumar al lote existente
        await this.db.query(
          `UPDATE lote
           SET cantidad_disponible = cantidad_disponible + $1,
               cantidad_inicial    = cantidad_inicial    + $1
           WHERE id_lote = $2`,
          [cantidad, loteDestino.id_lote],
        );
        await this.kardexAuto.entradaLote(loteDestino.id_lote, cantidad);
      } else {
        // No existe lote del material en destino → crear uno nuevo
        const nuevo_codigo = `${lote.codigo_lote}-T${Date.now().toString().slice(-4)}`;
        const [lote_nuevo] = await this.db.query<{ id_lote: string }[]>(
          `INSERT INTO lote
             (id_lote, id_material, id_responsable, id_ubicacion, codigo_lote,
              cantidad_inicial, cantidad_disponible, unidad_medida, fecha_entrada, estado)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $5, $6, NOW(), $7)
           RETURNING id_lote`,
          [
            lote.id_material, lote.id_responsable, id_ubicacion_destino,
            nuevo_codigo, cantidad, lote.unidad_medida, lote.estado,
          ],
        );
        await this.kardexAuto.entradaLote(lote_nuevo.id_lote, cantidad);
      }
    }

    await this.db.query(
      `INSERT INTO traslado_lote (id_traslado, id_lote, cantidad_trasladada) VALUES ($1, $2, $3)
       ON CONFLICT DO NOTHING`,
      [id_traslado, id_lote, cantidad],
    );
  }
}
