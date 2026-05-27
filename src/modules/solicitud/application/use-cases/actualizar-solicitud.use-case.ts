import { Injectable, Inject } from '@nestjs/common';
import { Solicitud } from '../../domain/entities/solicitud.entity';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';

@Injectable()
export class ActualizarSolicitudUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
  ) {}

  async execute(
    id: string,
    data: {
      id_ficha?: string;
      id_solicitante?: string;
      fecha_solicitud?: string;
      tipo_prestamo?: string;
      estado?: string;
      observaciones?: string;
    },
  ): Promise<Solicitud> {
    const mapped: Partial<Solicitud> = {
      ...(data.id_ficha !== undefined && { id_ficha: data.id_ficha }),
      ...(data.id_solicitante !== undefined && { id_solicitante: data.id_solicitante }),
      ...(data.fecha_solicitud !== undefined && { fecha_solicitud: new Date(data.fecha_solicitud) }),
      ...(data.tipo_prestamo !== undefined && { tipo_prestamo: data.tipo_prestamo }),
      ...(data.estado !== undefined && { estado: data.estado }),
      ...(data.observaciones !== undefined && { observaciones: data.observaciones }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
