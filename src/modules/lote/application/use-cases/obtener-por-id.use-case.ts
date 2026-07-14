import { Injectable, Inject } from '@nestjs/common';
import { Lote } from '../../domain/entities/lote.entity';
import type { LoteRepository } from '../../domain/ports/lote.repository';

@Injectable()
export class ObtenerPorIdUseCase {
  constructor(
    @Inject('LoteRepository')
    private readonly repo: LoteRepository,
  ) {}

  async execute(id: string): Promise<Lote | null> {
    return this.repo.obtenerPorId(id);
  }
}
