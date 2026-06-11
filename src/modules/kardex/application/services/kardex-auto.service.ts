import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TipoMovimiento } from '../../domain/entities/kardex.entity';

@Injectable()
export class KardexAutoService {
  constructor(
    @InjectDataSource() private readonly db: DataSource,
  ) {}

  private async insertar(data: {
    tipo_movimiento: TipoMovimiento;
    cantidad: number;
    saldo: number;
    id_unidad?: string | null;
    id_lote?: string | null;
    id_traslado?: string | null;
    id_incidencia?: string | null;
    id_entrega?: string | null;
    id_devolucion?: string | null;
  }): Promise<void> {
    await this.db.query(
      `INSERT INTO kardex
         (id, tipo_movimiento, cantidad, fecha_movimiento, saldo,
          id_unidad, id_lote, id_traslado, id_incidencia, id_entrega, id_devolucion)
       VALUES
         (gen_random_uuid(), $1, $2, NOW(), $3, $4, $5, $6, $7, $8, $9)`,
      [
        data.tipo_movimiento,
        data.cantidad,
        data.saldo,
        data.id_unidad    ?? null,
        data.id_lote      ?? null,
        data.id_traslado  ?? null,
        data.id_incidencia ?? null,
        data.id_entrega   ?? null,
        data.id_devolucion ?? null,
      ],
    );
  }

  async entradaLote(id_lote: string, cantidad_inicial: number): Promise<void> {
    await this.insertar({
      tipo_movimiento: TipoMovimiento.ENTRADA,
      cantidad: cantidad_inicial,
      saldo:    cantidad_inicial,
      id_lote,
    });
  }

  async trasladoUnidad(id_unidad: string, id_traslado: string): Promise<void> {
    await this.insertar({
      tipo_movimiento: TipoMovimiento.TRASLADO,
      cantidad: 1,
      saldo:    1,
      id_unidad,
      id_traslado,
    });
  }

  async trasladoLote(id_lote: string, cantidad: number, saldo_restante: number, id_traslado: string): Promise<void> {
    await this.insertar({
      tipo_movimiento: TipoMovimiento.TRASLADO,
      cantidad,
      saldo: saldo_restante,
      id_lote,
      id_traslado,
    });
  }

  async bajaUnidad(id_unidad: string, id_incidencia: string): Promise<void> {
    await this.insertar({
      tipo_movimiento: TipoMovimiento.AJUSTE,
      cantidad: 1,
      saldo:    0,
      id_unidad,
      id_incidencia,
    });
  }

  async salidaEntrega(id_entrega: string): Promise<void> {
    const unidades: { id_unidad: string }[] = await this.db.query(
      `SELECT id_unidad FROM entrega_unidad WHERE id_entrega = $1`,
      [id_entrega],
    );
    const lotes: { id_lote: string; cantidad_entregada: number; cantidad_disponible: number }[] = await this.db.query(
      `SELECT el.id_lote, el.cantidad_entregada, l.cantidad_disponible
       FROM entrega_lote el
       JOIN lote l ON l.id_lote = el.id_lote
       WHERE el.id_entrega = $1`,
      [id_entrega],
    );
    for (const u of unidades) {
      await this.insertar({
        tipo_movimiento: TipoMovimiento.SALIDA,
        cantidad: 1,
        saldo:    0,
        id_unidad: u.id_unidad,
        id_entrega,
      });
    }
    for (const l of lotes) {
      await this.insertar({
        tipo_movimiento: TipoMovimiento.SALIDA,
        cantidad: l.cantidad_entregada,
        saldo:    l.cantidad_disponible,
        id_lote:  l.id_lote,
        id_entrega,
      });
    }
  }

  async entradaDevolucion(id_devolucion: string, id_entrega: string): Promise<void> {
    const unidades: { id_unidad: string }[] = await this.db.query(
      `SELECT id_unidad FROM entrega_unidad WHERE id_entrega = $1`,
      [id_entrega],
    );
    const lotes: { id_lote: string; cantidad_entregada: number; cantidad_disponible: number }[] = await this.db.query(
      `SELECT el.id_lote, el.cantidad_entregada, l.cantidad_disponible
       FROM entrega_lote el
       JOIN lote l ON l.id_lote = el.id_lote
       WHERE el.id_entrega = $1`,
      [id_entrega],
    );
    for (const u of unidades) {
      await this.insertar({
        tipo_movimiento: TipoMovimiento.ENTRADA,
        cantidad: 1,
        saldo:    1,
        id_unidad:    u.id_unidad,
        id_devolucion,
      });
    }
    for (const l of lotes) {
      await this.insertar({
        tipo_movimiento: TipoMovimiento.ENTRADA,
        cantidad: l.cantidad_entregada,
        saldo:    l.cantidad_disponible,
        id_lote:  l.id_lote,
        id_devolucion,
      });
    }
  }
}
