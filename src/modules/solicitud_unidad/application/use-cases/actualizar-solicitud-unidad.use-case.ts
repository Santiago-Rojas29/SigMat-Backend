import { Injectable, Inject } from '@nestjs/common';
import { SolicitudUnidad } from '../../domain/entities/solicitud_unidad.entity';
import type { SolicitudUnidadRepository } from '../../domain/ports/solicitud_unidad.repository';

@Injectable()
export class ActualizarSolicitudUnidadUseCase {
  constructor(
    @Inject('SolicitudUnidadRepository')
    private readonly repo: SolicitudUnidadRepository,
  ) {}

  async execute(
    id_solicitud: number,
    id_unidad: number,
    data: {
      id_usuario?: number;
    },
  ): Promise<SolicitudUnidad> {
    const mapped: Partial<SolicitudUnidad> = { ...data };
    return this.repo.actualizar(id_solicitud, id_unidad, mapped);
  }
}
