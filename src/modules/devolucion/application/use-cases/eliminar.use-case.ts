import { Inject, Injectable } from '@nestjs/common';
import type { DevolucionRepository } from '../../domain/ports/devolucion.repository';

@Injectable()
export class EliminarDevolucionUseCase {
  constructor(
    @Inject('DevolucionRepository')
    private readonly repo: DevolucionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
