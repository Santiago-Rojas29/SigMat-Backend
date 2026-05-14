import { Injectable, Inject } from '@nestjs/common';
import type { UbicacionRepository } from '../../domain/ports/ubicacion.repository';

@Injectable()
export class EliminarUbicacionUseCase {
  constructor(
    @Inject('UbicacionRepository')
    private readonly repo: UbicacionRepository,
  ) { }

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
