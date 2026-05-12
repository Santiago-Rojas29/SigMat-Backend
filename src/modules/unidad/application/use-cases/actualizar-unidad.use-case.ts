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
    id: number,
    data: {
      id_material?: number;
      id_responsable?: number;
      id_ubicacion?: number;
      codigo_unidad?: string;
      estado?: string;
    },
  ): Promise<Unidad> {
    const mapped: Partial<Unidad> = { ...data };
    return this.repo.actualizar(id, mapped);
  }
}
