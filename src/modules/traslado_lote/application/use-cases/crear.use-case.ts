import { Inject, Injectable } from '@nestjs/common';
import { TrasladoLote } from '../../domain/entities/traslado_lote.entity';
import type { TrasladoLoteRepository } from '../../domain/ports/traslado_lote.repository';

@Injectable()
export class CrearTrasladoLoteUseCase {
  constructor(
    @Inject('TrasladoLoteRepository')
    private readonly repo: TrasladoLoteRepository,
  ) {}

  async execute(data: { id_traslado: string; id_lote: string; cantidad_trasladada: number }): Promise<TrasladoLote> {
    const entity = new TrasladoLote(data.id_traslado, data.id_lote, data.cantidad_trasladada);
    entity.validar();
    return this.repo.crear(entity);
  }
}
