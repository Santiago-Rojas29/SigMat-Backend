import { Injectable, Inject } from '@nestjs/common';
import { Lote } from '../../domain/entities/lote.entity';
import type { LoteRepository } from '../../domain/ports/lote.repository';

@Injectable()
export class ObtenerTodosUseCase {
  constructor(
    @Inject('LoteRepository')
    private readonly repo: LoteRepository,
  ) {}

  async execute(): Promise<Lote[]> {
    return this.repo.obtenerTodos();
  }
}
