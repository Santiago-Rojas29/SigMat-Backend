import { Injectable, Inject } from '@nestjs/common';
import { Material, CategoriaMaterial } from '../../domain/entities/material.entity';
import type { MaterialRepository } from '../../domain/ports/material.repository';

@Injectable()
export class ActualizarMaterialUseCase {
  constructor(
    @Inject('MaterialRepository')
    private readonly repo: MaterialRepository,
  ) {}

  async execute(
    id: string,
    data: {
      nombre?: string;
      categoria?: CategoriaMaterial;
      tipo?: string;
      marca?: string | null;
      modelo?: string | null;
      descripcion?: string;
      codigo_unspsc?: string;
      unidad_medida?: string | null;
    },
  ): Promise<Material> {
    const mapped: Partial<Material> = {
      ...(data.nombre     !== undefined && { nombre:        data.nombre }),
      ...(data.categoria  !== undefined && { categoria:     data.categoria }),
      ...(data.tipo       !== undefined && { tipo:          data.tipo }),
      ...(data.marca      !== undefined && { marca:         data.marca }),
      ...(data.modelo     !== undefined && { modelo:        data.modelo }),
      ...(data.descripcion !== undefined && { descripcion:  data.descripcion }),
      ...(data.codigo_unspsc !== undefined && { codigo_unspsc: data.codigo_unspsc }),
      ...(data.unidad_medida !== undefined && { unidad_medida: data.unidad_medida }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
