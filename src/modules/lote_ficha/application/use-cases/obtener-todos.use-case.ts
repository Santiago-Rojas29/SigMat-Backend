import { Injectable, Inject } from '@nestjs/common';
import { LoteFicha } from '../../domain/entities/lote_ficha.entity';
import type { LoteFichaRepository } from '../../domain/ports/lote_ficha.repository';

@Injectable()
export class ObtenerTodosLoteFichaUseCase {
  constructor(
    @Inject('LoteFichaRepository')
    private readonly repo: LoteFichaRepository,
  ) {}

  async execute(): Promise<LoteFicha[]> {
    return this.repo.obtenerTodos();
  }
}
