import { Injectable, Inject } from '@nestjs/common';
import { Prestamo } from '../../domain/entities/prestamo.entity';
import type { PrestamoRepository } from '../../domain/ports/prestamo.repository';

@Injectable()
export class ObtenerPorIdUseCase {
  constructor(
    @Inject('PrestamoRepository')
    private readonly repo: PrestamoRepository,
  ) {}

  async execute(id: string): Promise<Prestamo | null> {
    return this.repo.obtenerPorId(id);
  }
}
