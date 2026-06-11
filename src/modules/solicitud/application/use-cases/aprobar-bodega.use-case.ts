import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';
import { EstadoSolicitud } from '../../domain/entities/solicitud.entity';
import { NotificacionesService } from '../../../notificaciones/notificaciones.service';

@Injectable()
export class AprobarBodegaUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
    private readonly notificaciones: NotificacionesService,
  ) {}

  async execute(id: string, id_bodega: string): Promise<void> {
    const solicitud = await this.repo.obtenerPorId(id);
    if (!solicitud) throw new NotFoundException('Solicitud no encontrada');
    if (solicitud.estado !== EstadoSolicitud.PENDIENTE_BODEGA)
      throw new BadRequestException('La solicitud no está pendiente de aprobación de bodega');

    await this.repo.actualizar(id, {
      estado: EstadoSolicitud.APROBADO,
      id_bodega,
      fecha_respuesta_bodega: new Date(),
    });

    await this.notificaciones.notificarCambioEstado(id, EstadoSolicitud.APROBADO, solicitud.id_solicitante);
    this.notificaciones.notificarActualizacion('solicitud');
  }
}
