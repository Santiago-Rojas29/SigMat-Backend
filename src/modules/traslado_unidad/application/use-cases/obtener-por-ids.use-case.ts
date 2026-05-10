import { Inject, Injectable } from '@nestjs/common';
import { TrasladoUnidad } from '../../domain/entities/traslado_unidad.entity';
import type { TrasladoUnidadRepository } from '../../domain/ports/traslado_unidad.repository';

@Injectable()
export class ObtenerPorIdsTrasladoUnidadUseCase {
  constructor(
    @Inject('TrasladoUnidadRepository')
    private readonly repo: TrasladoUnidadRepository,
  ) {}

  async execute(id_traslado: string, id_unidad: string): Promise<TrasladoUnidad | null> {
    return this.repo.obtenerPorIds(id_traslado, id_unidad);
  }
}
