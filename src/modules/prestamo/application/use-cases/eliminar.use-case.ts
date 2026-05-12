import { Injectable, Inject } from '@nestjs/common';
import type { PrestamoRepository } from '../../domain/ports/prestamo.repository';

@Injectable()
export class EliminarPrestamoUseCase {
  constructor(
    @Inject('PrestamoRepository')
    private readonly repo: PrestamoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
