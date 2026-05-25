import { Injectable, Inject } from '@nestjs/common';
import type { CentroRepository } from '../../domain/ports/centro.repository';

@Injectable()
export class EliminarCentroUseCase {
  constructor(
    @Inject('CentroRepository')
    private readonly repo: CentroRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
