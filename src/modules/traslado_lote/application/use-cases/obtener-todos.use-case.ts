import { Inject, Injectable } from '@nestjs/common';
import { TrasladoLote } from '../../domain/entities/traslado_lote.entity';
import type { TrasladoLoteRepository } from '../../domain/ports/traslado_lote.repository';

@Injectable()
export class ObtenerTodosTrasladoLoteUseCase {
  constructor(
    @Inject('TrasladoLoteRepository')
    private readonly repo: TrasladoLoteRepository,
  ) {}

  async execute(): Promise<TrasladoLote[]> {
    return this.repo.obtenerTodos();
  }
}
