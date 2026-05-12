import { Injectable, Inject } from '@nestjs/common';
import { TipoUbicacion } from '../../domain/entities/tipo_ubicacion.entity';
import type { TipoUbicacionRepository } from '../../domain/ports/tipo_ubicacion.repository';

@Injectable()
export class ActualizarTipoUbicacionUseCase {
  constructor(
    @Inject('TipoUbicacionRepository')
    private readonly repo: TipoUbicacionRepository,
  ) {}

  async execute(
    id: number,
    data: {
      nombre?: string;
      descripcion?: string;
    },
  ): Promise<TipoUbicacion> {
    const mapped: Partial<TipoUbicacion> = { ...data };
    return this.repo.actualizar(id, mapped);
  }
}
