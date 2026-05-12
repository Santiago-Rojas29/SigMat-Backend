import { Injectable, Inject } from '@nestjs/common';
import type { UnidadRepository } from '../../domain/ports/unidad.repository';

@Injectable()
export class EliminarUnidadUseCase {
  constructor(
    @Inject('UnidadRepository')
    private readonly repo: UnidadRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.eliminar(id);
  }
}
