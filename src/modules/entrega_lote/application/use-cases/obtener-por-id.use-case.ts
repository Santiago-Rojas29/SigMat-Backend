import { Injectable, Inject } from '@nestjs/common';
import { EntregaLote } from '../../domain/entities/entrega_lote.entity';
import type { EntregaLoteRepository } from '../../domain/ports/entrega_lote.repository';

@Injectable()
export class ObtenerEntregaLotePorIdsUseCase {
  constructor(
    @Inject('EntregaLoteRepository')
    private readonly repo: EntregaLoteRepository,
  ) {}

  async execute(id_entrega: string, id_lote: string): Promise<EntregaLote | null> {
    return this.repo.obtenerPorIds(id_entrega, id_lote);
  }
}
