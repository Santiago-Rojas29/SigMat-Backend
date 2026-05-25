import { Injectable, Inject } from '@nestjs/common';
import type { LoteRepository } from '../../domain/ports/lote.repository';
import { Lote } from '../../domain/entities/lote.entity';

@Injectable()
export class CreateLoteUseCase {
  constructor(
    @Inject('LoteRepository')
    private readonly repo: LoteRepository,
  ) {}

  async execute(data: {
    id_material: string;
    id_responsable: string;
    id_ubicacion: string;
    codigo_lote: string;
    cantidad_inicial: number;
    cantidad_disponible: number;
    unidad_medida: string;
    fecha_entrada: string;
  }): Promise<Lote> {
    const entity = new Lote("",
      data.id_material,
      data.id_responsable,
      data.id_ubicacion,
      data.codigo_lote,
      data.cantidad_inicial,
      data.cantidad_disponible,
      data.unidad_medida,
      new Date(data.fecha_entrada),
    );
    return this.repo.crear(entity);
  }
}
