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
    id_ficha: string;
    nombre: string;
    categoria: CategoriaMaterial;
    tipo: string;
    marca: string;
    modelo: string;
    descripcion: string;
    codigo_unspsc: string;
    unidad_medida?: string;
    fecha_vencimiento?: string;
  }): Promise<Material> {
    const entity = new Material(
      '',
      data.id_ficha,
      data.nombre,
      data.categoria,
      data.tipo,
      data.marca,
      data.modelo,
      data.descripcion,
      data.codigo_unspsc,
      data.unidad_medida,
      data.fecha_vencimiento ? new Date(data.fecha_vencimiento) : undefined,
    );
    entity.validar();
    return this.repo.crear(entity);
  }
}
