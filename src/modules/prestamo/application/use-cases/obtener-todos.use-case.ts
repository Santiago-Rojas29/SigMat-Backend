import { Inject } from '@nestjs/common';
import { Prestamo } from '../../domain/entities/prestamo.entity';
import type { PrestamoRepository } from '../../domain/ports/prestamo.repository';

export class ObtenerTodosUseCase {
  constructor(
    @Inject('PrestamoRepository')
    private readonly repo: PrestamoRepository,
  ) {}

  async execute(): Promise<Prestamo[]> {
    return this.repo.obtenerTodos();
  }
}
