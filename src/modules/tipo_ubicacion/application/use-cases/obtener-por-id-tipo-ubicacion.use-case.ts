import { Injectable, Inject } from '@nestjs/common';
import { TipoUbicacion } from '../../domain/entities/tipo_ubicacion.entity';
import type { TipoUbicacionRepository } from '../../domain/ports/tipo_ubicacion.repository';

@Injectable()
export class ObtenerPorIdTipoUbicacionUseCase {
  constructor(
    @Inject('TipoUbicacionRepository')
    private readonly repo: TipoUbicacionRepository,
  ) {}

  async execute(id: number): Promise<TipoUbicacion | null> {
    return this.repo.obtenerPorId(id);
  }
}
