import { Injectable, Inject } from '@nestjs/common';
import { Centro } from '../../domain/entities/centro.entity';
import type { CentroRepository } from '../../domain/ports/centro.repository';

@Injectable()
export class ObtenerPorIdUseCase {
  constructor(
    @Inject('CentroRepository')
    private readonly repo: CentroRepository,
  ) {}

  async execute(id: string): Promise<Centro | null> {
    return this.repo.obtenerPorId(id);
  }
}
