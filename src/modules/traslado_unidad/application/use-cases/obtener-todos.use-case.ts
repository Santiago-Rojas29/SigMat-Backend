import { Inject, Injectable } from '@nestjs/common';
import { TrasladoUnidad } from '../../domain/entities/traslado_unidad.entity';
import type { TrasladoUnidadRepository } from '../../domain/ports/traslado_unidad.repository';

@Injectable()
export class ObtenerTodosTrasladoUnidadUseCase {
  constructor(
    @Inject('TrasladoUnidadRepository')
    private readonly repo: TrasladoUnidadRepository,
  ) {}

  async execute(): Promise<TrasladoUnidad[]> {
    return this.repo.obtenerTodos();
  }
}
