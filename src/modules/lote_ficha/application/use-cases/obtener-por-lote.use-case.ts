import { Injectable, Inject } from '@nestjs/common';
import { LoteFicha } from '../../domain/entities/lote_ficha.entity';
import type { LoteFichaRepository } from '../../domain/ports/lote_ficha.repository';

@Injectable()
export class ObtenerPorLoteUseCase {
  constructor(@Inject('LoteFichaRepository') private readonly repo: LoteFichaRepository) {}

  async execute(id_lote: string): Promise<LoteFicha[]> {
    return this.repo.obtenerPorLote(id_lote);
  }
}
