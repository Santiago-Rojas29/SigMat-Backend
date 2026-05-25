import { Injectable, Inject } from '@nestjs/common';
import type { UnidadRepository } from '../../domain/ports/unidad.repository';
import { Unidad } from '../../domain/entities/unidad.entity';

@Injectable()
export class CreateUnidadUseCase {
  constructor(
    @Inject('UnidadRepository')
    private readonly repo: UnidadRepository,
  ) {}

  async execute(data: {
    id_material: string;
    id_responsable: string;
    id_ubicacion: string;
    codigo_unidad: string;
    estado: string;
  }): Promise<Unidad> {
    const entity = new Unidad(
      "",
      data.id_material,
      data.id_responsable,
      data.id_ubicacion,
      data.codigo_unidad,
      data.estado,
    );
    return this.repo.crear(entity);
  }
}
