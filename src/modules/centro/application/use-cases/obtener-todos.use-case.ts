import { Inject } from '@nestjs/common';
import { Centro } from '../../domain/entities/centro.entity';
import type { CentroRepository } from '../../domain/ports/centro.repository';

export class ObtenerTodosUseCase {
  constructor(
    @Inject('CentroRepository')
    private readonly repo: CentroRepository,
  ) {}

  async execute(): Promise<Centro[]> {
    return this.repo.obtenerTodos();
  }
}
