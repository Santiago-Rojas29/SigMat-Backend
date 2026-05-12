import { Injectable, Inject } from '@nestjs/common';
import { SolicitudUnidad } from '../../domain/entities/solicitud_unidad.entity';
import type { SolicitudUnidadRepository } from '../../domain/ports/solicitud_unidad.repository';

@Injectable()
export class ObtenerPorIdUseCase {
  constructor(
    @Inject('SolicitudUnidadRepository')
    private readonly repo: SolicitudUnidadRepository,
  ) {}

  async execute(id_solicitud: number, id_unidad: number): Promise<SolicitudUnidad | null> {
    return this.repo.obtenerPorId(id_solicitud, id_unidad);
  }
}
