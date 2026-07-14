import { Injectable, Inject } from '@nestjs/common';
import { Material, CategoriaMaterial } from '../../domain/entities/material.entity';
import type { MaterialRepository } from '../../domain/ports/material.repository';

@Injectable()
export class CrearMaterialUseCase {
  constructor(
    @Inject('MaterialRepository')
    private readonly repo: MaterialRepository,
  ) {}

  async execute(data: {
    nombre: string;
    categoria: CategoriaMaterial;
    tipo: string;
    marca?: string | null;
    modelo?: string | null;
    descripcion: string;
    codigo_unspsc: string;
    unidad_medida?: string | null;
  }): Promise<Material> {
    const entity = new Material(
      '',
      data.nombre,
      data.categoria,
      data.tipo,
      data.marca ?? null,
      data.modelo ?? null,
      data.descripcion,
      data.codigo_unspsc,
      data.unidad_medida ?? null,
    );
    entity.validar();
    return this.repo.crear(entity);
  }
}
