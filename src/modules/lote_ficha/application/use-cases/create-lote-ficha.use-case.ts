import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { LoteFicha } from '../../domain/entities/lote_ficha.entity';
import type { LoteFichaRepository } from '../../domain/ports/lote_ficha.repository';
import type { LoteRepository } from '../../../lote/domain/ports/lote.repository';

@Injectable()
export class CreateLoteFichaUseCase {
  constructor(
    @Inject('LoteFichaRepository') private readonly repo: LoteFichaRepository,
    @Inject('LoteRepository')      private readonly loteRepo: LoteRepository,
  ) {}

  async execute(data: { id_lote: string; id_ficha: string; cantidad: number }): Promise<LoteFicha> {
    const lote = await this.loteRepo.obtenerPorId(data.id_lote);
    if (!lote) throw new NotFoundException(`Lote con id ${data.id_lote} no encontrado`);

    if (data.cantidad > lote.cantidad_disponible) {
      throw new BadRequestException(
        `Stock insuficiente. Disponible: ${lote.cantidad_disponible}, solicitado: ${data.cantidad}`,
      );
    }

    const entity = new LoteFicha('', data.id_lote, data.id_ficha, data.cantidad);
    entity.validar();

    await this.loteRepo.actualizar(data.id_lote, {
      cantidad_disponible: lote.cantidad_disponible - data.cantidad,
    });

    return this.repo.crear(entity);
  }
}
