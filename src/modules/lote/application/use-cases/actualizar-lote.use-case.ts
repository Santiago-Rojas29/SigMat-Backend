import { Injectable, Inject } from '@nestjs/common';
import { Lote } from '../../domain/entities/lote.entity';
import type { LoteRepository } from '../../domain/ports/lote.repository';

@Injectable()
export class ActualizarLoteUseCase {
  constructor(
    @Inject('LoteRepository')
    private readonly repo: LoteRepository,
  ) {}

  async execute(
    id: number,
    data: {
      id_material?: number;
      id_responsable?: number;
      id_ubicacion?: number;
      codigo_lote?: string;
      cantidad_inicial?: number;
      cantidad_disponible?: number;
      unidad_medida?: string;
      fecha_entrada?: string;
    },
  ): Promise<Lote> {
    const mapped: Partial<Lote> = {
      ...(data.id_material !== undefined && { id_material: data.id_material }),
      ...(data.id_responsable !== undefined && { id_responsable: data.id_responsable }),
      ...(data.id_ubicacion !== undefined && { id_ubicacion: data.id_ubicacion }),
      ...(data.codigo_lote !== undefined && { codigo_lote: data.codigo_lote }),
      ...(data.cantidad_inicial !== undefined && { cantidad_inicial: data.cantidad_inicial }),
      ...(data.cantidad_disponible !== undefined && { cantidad_disponible: data.cantidad_disponible }),
      ...(data.unidad_medida !== undefined && { unidad_medida: data.unidad_medida }),
      ...(data.fecha_entrada !== undefined && { fecha_entrada: new Date(data.fecha_entrada) }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
