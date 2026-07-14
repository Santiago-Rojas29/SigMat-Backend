import { Inject, Injectable } from '@nestjs/common';
import { TrasladoLote } from '../../domain/entities/traslado_lote.entity';
import type { TrasladoLoteRepository } from '../../domain/ports/traslado_lote.repository';

@Injectable()
export class ObtenerPorIdsTrasladoLoteUseCase {
  constructor(
    @Inject('TrasladoLoteRepository')
    private readonly repo: TrasladoLoteRepository,
  ) {}

  async execute(id_traslado: string, id_lote: string): Promise<TrasladoLote | null> {
    return this.repo.obtenerPorIds(id_traslado, id_lote);
  }
}
