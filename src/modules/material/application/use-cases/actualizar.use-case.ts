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
      id_ficha?: string;
      nombre?: string;
      categoria?: CategoriaMaterial;
      tipo?: string;
      marca?: string;
      modelo?: string;
      descripcion?: string;
      codigo_unspsc?: string;
    },
  ): Promise<Material> {
    const mapped: Partial<Material> = {
      ...(data.id_ficha && { id_ficha: data.id_ficha }),
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.categoria && { categoria: data.categoria }),
      ...(data.tipo && { tipo: data.tipo }),
      ...(data.marca && { marca: data.marca }),
      ...(data.modelo && { modelo: data.modelo }),
      ...(data.descripcion && { descripcion: data.descripcion }),
      ...(data.codigo_unspsc && { codigo_unspsc: data.codigo_unspsc }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
