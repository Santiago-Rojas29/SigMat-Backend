import { Inject, Injectable } from '@nestjs/common';
import { TrasladoUnidad } from '../../domain/entities/traslado_unidad.entity';
import type { TrasladoUnidadRepository } from '../../domain/ports/traslado_unidad.repository';

@Injectable()
export class CrearTrasladoUnidadUseCase {
  constructor(
    @Inject('TrasladoUnidadRepository')
    private readonly repo: TrasladoUnidadRepository,
  ) {}

  async execute(data: { id_traslado: string; id_unidad: string }): Promise<TrasladoUnidad> {
    const entity = new TrasladoUnidad(data.id_traslado, data.id_unidad);
    entity.validar();
    return this.repo.crear(entity);
  }
}
