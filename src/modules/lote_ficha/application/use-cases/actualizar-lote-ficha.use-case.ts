import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { LoteFicha } from '../../domain/entities/lote_ficha.entity';
import type { LoteFichaRepository } from '../../domain/ports/lote_ficha.repository';
import type { LoteRepository } from '../../../lote/domain/ports/lote.repository';

@Injectable()
export class ActualizarLoteFichaUseCase {
  constructor(
    @Inject('LoteFichaRepository') private readonly repo: LoteFichaRepository,
    @Inject('LoteRepository')      private readonly loteRepo: LoteRepository,
  ) {}

  async execute(id: string, cantidad: number): Promise<LoteFicha> {
    const existing = await this.repo.obtenerPorId(id);
    if (!existing) throw new NotFoundException(`LoteFicha con id ${id} no encontrado`);
    if (cantidad <= 0) throw new BadRequestException('La cantidad debe ser mayor a 0');

    const lote = await this.loteRepo.obtenerPorId(existing.id_lote);
    if (!lote) throw new NotFoundException(`Lote con id ${existing.id_lote} no encontrado`);

    // delta positivo = se pide más stock; delta negativo = se libera stock
    const delta = cantidad - existing.cantidad;
    if (delta > 0 && delta > lote.cantidad_disponible) {
      throw new BadRequestException(
        `Stock insuficiente. Disponible: ${lote.cantidad_disponible}, incremento solicitado: ${delta}`,
      );
    }

    await this.loteRepo.actualizar(existing.id_lote, {
      cantidad_disponible: lote.cantidad_disponible - delta,
    });

    return this.repo.actualizar(id, cantidad);
  }
}
