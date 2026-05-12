import { Injectable, Inject } from '@nestjs/common';
import { EntregaLote } from '../../domain/entities/entrega_lote.entity';
import type { EntregaLoteRepository } from '../../domain/ports/entrega_lote.repository';

@Injectable()
export class ObtenerTodosEntregaLoteUseCase {
  constructor(
    @Inject('EntregaLoteRepository')
    private readonly repo: EntregaLoteRepository,
  ) {}

  async execute(): Promise<EntregaLote[]> {
    return this.repo.obtenerTodos();
  }
}
