import { Injectable, Inject } from '@nestjs/common';
import { Unidad } from '../../domain/entities/unidad.entity';
import type { UnidadRepository } from '../../domain/ports/unidad.repository';

@Injectable()
export class ActualizarUnidadUseCase {
  constructor(
    @Inject('UnidadRepository')
    private readonly repo: UnidadRepository,
  ) {}

  async execute(
    id: string,
    data: {
      id_material?: string;
      id_responsable?: string;
      id_ubicacion?: string;
      codigo_unidad?: string;
      estado?: string;
      id_ficha?: string | null;
    },
  ): Promise<Unidad> {
    return this.repo.actualizar(id, data as Partial<Unidad>);
  }
}
