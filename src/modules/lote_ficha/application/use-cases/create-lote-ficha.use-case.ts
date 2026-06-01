import { Injectable, Inject } from '@nestjs/common';
import { LoteFicha } from '../../domain/entities/lote_ficha.entity';
import type { LoteFichaRepository } from '../../domain/ports/lote_ficha.repository';

@Injectable()
export class CreateLoteFichaUseCase {
  constructor(@Inject('LoteFichaRepository') private readonly repo: LoteFichaRepository) {}

  async execute(data: { id_lote: string; id_ficha: string; cantidad: number }): Promise<LoteFicha> {
    const entity = new LoteFicha('', data.id_lote, data.id_ficha, data.cantidad);
    entity.validar();
    return this.repo.crear(entity);
  }
}
