import { Injectable, Inject } from '@nestjs/common';
import { LoteFicha } from '../../domain/entities/lote_ficha.entity';
import type { LoteFichaRepository } from '../../domain/ports/lote_ficha.repository';

@Injectable()
export class ActualizarLoteFichaUseCase {
  constructor(@Inject('LoteFichaRepository') private readonly repo: LoteFichaRepository) {}

  async execute(id: string, data: { cantidad?: number }): Promise<LoteFicha> {
    const mapped: Partial<LoteFicha> = {
      ...(data.cantidad !== undefined && { cantidad: data.cantidad }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
