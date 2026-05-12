import { Injectable, Inject } from '@nestjs/common';
import { Ubicacion } from '../../domain/entities/ubicacion.entity';
import type { UbicacionRepository } from '../../domain/ports/ubicacion.repository';

@Injectable()
export class ActualizarUbicacionUseCase {
  constructor(
    @Inject('UbicacionRepository')
    private readonly repo: UbicacionRepository,
  ) {}

  async execute(
    id: number,
    data: {
      id_area?: number;
      id_tipo_ubicacion?: number;
      nombre?: string;
      descripcion?: string;
      estado?: string;
    },
  ): Promise<Ubicacion> {
    const mapped: Partial<Ubicacion> = { ...data };
    return this.repo.actualizar(id, mapped);
  }
}
