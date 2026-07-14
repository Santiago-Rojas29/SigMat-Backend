import { Injectable, Inject } from '@nestjs/common';
import { SolicitudUnidad } from '../../domain/entities/solicitud_unidad.entity';
import type { SolicitudUnidadRepository } from '../../domain/ports/solicitud_unidad.repository';

@Injectable()
export class ObtenerTodosUseCase {
  constructor(
    @Inject('SolicitudUnidadRepository')
    private readonly repo: SolicitudUnidadRepository,
  ) {}

  async execute(): Promise<SolicitudUnidad[]> {
    return this.repo.obtenerTodos();
  }
}
