import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LoteFicha } from '../../domain/entities/lote_ficha.entity';
import type { LoteFichaRepository } from '../../domain/ports/lote_ficha.repository';

@Injectable()
export class ActualizarLoteFichaUseCase {
  constructor(
    @Inject('LoteFichaRepository')
    private readonly repo: LoteFichaRepository,
  ) {}

  async execute(id: string, cantidad: number): Promise<LoteFicha> {
    const existing = await this.repo.obtenerPorId(id);
    if (!existing) throw new NotFoundException(`LoteFicha con id ${id} no encontrado`);
    if (cantidad <= 0) throw new Error('La cantidad debe ser mayor a 0');
    return this.repo.actualizar(id, cantidad);
  }
}
