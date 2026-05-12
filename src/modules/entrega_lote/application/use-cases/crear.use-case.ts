import { Injectable, Inject } from '@nestjs/common';
import { EntregaLote } from '../../domain/entities/entrega_lote.entity';
import type { EntregaLoteRepository } from '../../domain/ports/entrega_lote.repository';

@Injectable()
export class CrearEntregaLoteUseCase {
  constructor(
    @Inject('EntregaLoteRepository')
    private readonly repo: EntregaLoteRepository,
  ) {}

  async execute(data: { id_entrega: string; id_lote: string; cantidad_entregada: number; cantidad_devuelta: number }): Promise<EntregaLote> {
    const entregaLote = new EntregaLote(data.id_entrega, data.id_lote, data.cantidad_entregada, data.cantidad_devuelta);
    entregaLote.validar();
    return this.repo.crear(entregaLote);
  }
}
