import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { LoteFichaRepository } from '../../domain/ports/lote_ficha.repository';
import type { LoteRepository } from '../../../lote/domain/ports/lote.repository';

@Injectable()
export class EliminarLoteFichaUseCase {
  constructor(
    @Inject('LoteFichaRepository') private readonly repo: LoteFichaRepository,
    @Inject('LoteRepository')      private readonly loteRepo: LoteRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repo.obtenerPorId(id);
    if (!existing) throw new NotFoundException(`LoteFicha con id ${id} no encontrado`);

    const lote = await this.loteRepo.obtenerPorId(existing.id_lote);
    if (lote) {
      await this.loteRepo.actualizar(existing.id_lote, {
        cantidad_disponible: lote.cantidad_disponible + existing.cantidad,
      });
    }

    return this.repo.eliminar(id);
  }
}
