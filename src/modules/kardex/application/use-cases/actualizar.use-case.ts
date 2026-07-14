import { Inject, Injectable } from '@nestjs/common';
import { Kardex, TipoMovimiento } from '../../domain/entities/kardex.entity';
import type { KardexRepository } from '../../domain/ports/kardex.repository';

@Injectable()
export class ActualizarKardexUseCase {
  constructor(
    @Inject('KardexRepository')
    private readonly repo: KardexRepository,
  ) {}

  async execute(
    id: string,
    data: {
      tipo_movimiento?: TipoMovimiento;
      cantidad?: number;
      fecha_movimiento?: string;
      saldo?: number;
      id_unidad?: string;
      id_lote?: string;
      id_entrega?: string;
      id_devolucion?: string;
      id_traslado?: string;
      id_incidencia?: string;
    },
  ): Promise<Kardex> {
    const mapped: Partial<Kardex> = {
      ...(data.tipo_movimiento && { tipo_movimiento: data.tipo_movimiento }),
      ...(data.cantidad != null && { cantidad: data.cantidad }),
      ...(data.fecha_movimiento && { fecha_movimiento: new Date(data.fecha_movimiento) }),
      ...(data.saldo != null && { saldo: data.saldo }),
      ...(data.id_unidad !== undefined && { id_unidad: data.id_unidad ?? null }),
      ...(data.id_lote !== undefined && { id_lote: data.id_lote ?? null }),
      ...(data.id_entrega !== undefined && { id_entrega: data.id_entrega ?? null }),
      ...(data.id_devolucion !== undefined && { id_devolucion: data.id_devolucion ?? null }),
      ...(data.id_traslado !== undefined && { id_traslado: data.id_traslado ?? null }),
      ...(data.id_incidencia !== undefined && { id_incidencia: data.id_incidencia ?? null }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
