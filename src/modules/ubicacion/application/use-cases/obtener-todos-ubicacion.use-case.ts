import { Injectable, Inject } from '@nestjs/common';
import { Ubicacion } from '../../domain/entities/ubicacion.entity';
import type { UbicacionRepository } from '../../domain/ports/ubicacion.repository';

@Injectable()
export class ObtenerTodosUbicacionUseCase {
  constructor(
    @Inject('UbicacionRepository')
    private readonly repo: UbicacionRepository,
  ) {}

  async execute(): Promise<Ubicacion[]> {
    return this.repo.obtenerTodos();
  }
}
