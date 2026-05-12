import { Injectable, Inject } from '@nestjs/common';
import { EntregaLote } from '../../domain/entities/entrega_lote.entity';
import type { EntregaLoteRepository } from '../../domain/ports/entrega_lote.repository';

@Injectable()
export class ActualizarEntregaLoteUseCase {
  constructor(
    @Inject('EntregaLoteRepository')
    private readonly repo: EntregaLoteRepository,
  ) {}

  async execute(id_entrega: string, id_lote: string, data: { cantidad_entregada?: number; cantidad_devuelta?: number }): Promise<EntregaLote> {
    const mapped: Partial<EntregaLote> = {
      ...(data.cantidad_entregada !== undefined && { cantidad_entregada: data.cantidad_entregada }),
      ...(data.cantidad_devuelta !== undefined && { cantidad_devuelta: data.cantidad_devuelta }),
    };
    return this.repo.actualizar(id_entrega, id_lote, mapped);
  }
}
