import { Injectable, Inject } from '@nestjs/common';
import type { SolicitudUnidadRepository } from '../../domain/ports/solicitud_unidad.repository';
import { SolicitudUnidad } from '../../domain/entities/solicitud_unidad.entity';

@Injectable()
export class CreateSolicitudUnidadUseCase {
  constructor(
    @Inject('SolicitudUnidadRepository')
    private readonly repo: SolicitudUnidadRepository,
  ) {}

  async execute(data: {
    id_solicitud: string;
    id_unidad: string;
    id_usuario: string;
  }): Promise<SolicitudUnidad> {
    const entity = new SolicitudUnidad(
      data.id_solicitud,
      data.id_unidad,
      data.id_usuario,
    );
    return this.repo.crear(entity);
  }
}
