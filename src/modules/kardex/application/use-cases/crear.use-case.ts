import { Inject, Injectable } from '@nestjs/common';
import { Kardex, TipoMovimiento } from '../../domain/entities/kardex.entity';
import type { KardexRepository } from '../../domain/ports/kardex.repository';

@Injectable()
export class CrearKardexUseCase {
  constructor(
    @Inject('KardexRepository')
    private readonly repo: KardexRepository,
  ) {}

  async execute(data: {
    tipo_movimiento: TipoMovimiento;
    cantidad: number;
    fecha_movimiento: string;
    saldo: number;
    id_unidad?: string;
    id_lote?: string;
    id_entrega?: string;
    id_devolucion?: string;
    id_traslado?: string;
    id_incidencia?: string;
  }): Promise<Kardex> {
    const entity = new Kardex(
      '',
      data.tipo_movimiento,
      data.cantidad,
      new Date(data.fecha_movimiento),
      data.saldo,
      data.id_unidad ?? null,
      data.id_lote ?? null,
      data.id_entrega ?? null,
      data.id_devolucion ?? null,
      data.id_traslado ?? null,
      data.id_incidencia ?? null,
    );
    entity.validar();
    return this.repo.crear(entity);
  }
}
