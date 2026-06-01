import { Injectable, Inject } from '@nestjs/common';
import type { LoteFichaRepository } from '../../domain/ports/lote_ficha.repository';

@Injectable()
export class EliminarLoteFichaUseCase {
  constructor(
    @Inject('LoteFichaRepository')
    private readonly repo: LoteFichaRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return this.repo.eliminar(id);
  }
}
