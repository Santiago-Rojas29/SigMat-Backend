import { Injectable, Inject } from '@nestjs/common';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';
import { Solicitud } from '../../domain/entities/solicitud.entity';

@Injectable()
export class CreateSolicitudUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
  ) {}

  async execute(data: {
    id_solicitante: string;
    fecha_solicitud: string;
    tipo_prestamo: string;
    estado: string;
    observaciones: string;
  }): Promise<Solicitud> {
    const entity = new Solicitud("",
      data.id_solicitante,
      new Date(data.fecha_solicitud),
      data.tipo_prestamo,
      data.estado,
      data.observaciones,
    );
    return this.repo.crear(entity);
  }
}
