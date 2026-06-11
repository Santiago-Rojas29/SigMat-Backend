import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';
import { EstadoSolicitud, TipoPrestamo } from '../../domain/entities/solicitud.entity';
import { NotificacionesService } from '../../../notificaciones/notificaciones.service';

@Injectable()
export class AprobarInstructorUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
    private readonly notificaciones: NotificacionesService,
  ) {}

  async execute(id: string): Promise<void> {
    const solicitud = await this.repo.obtenerPorId(id);
    if (!solicitud) throw new NotFoundException('Solicitud no encontrada');
    if (solicitud.estado !== EstadoSolicitud.PENDIENTE_INSTRUCTOR)
      throw new BadRequestException('La solicitud no está pendiente de aprobación del instructor');

    const estadoSiguiente = solicitud.tipo_prestamo === TipoPrestamo.EXTERNO
      ? EstadoSolicitud.PENDIENTE_ADMIN
      : EstadoSolicitud.PENDIENTE_BODEGA;

    await this.repo.actualizar(id, {
      estado: estadoSiguiente,
      fecha_respuesta_instructor: new Date(),
    });

    this.notificaciones.notificarActualizacion('solicitud');
  }
}
