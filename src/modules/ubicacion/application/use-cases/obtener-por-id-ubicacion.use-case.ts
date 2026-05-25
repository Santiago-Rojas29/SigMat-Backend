import { Injectable, Inject } from '@nestjs/common';
import { Ubicacion } from '../../domain/entities/ubicacion.entity';
import type { UbicacionRepository } from '../../domain/ports/ubicacion.repository';

@Injectable()
export class ObtenerPorIdUbicacionUseCase {
  constructor(
    @Inject('UbicacionRepository')
    private readonly repo: UbicacionRepository,
  ) { }

  async execute(id: string): Promise<Ubicacion | null> {
    return this.repo.obtenerPorId(id);
  }
}
