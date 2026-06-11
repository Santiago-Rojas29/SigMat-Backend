import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';
import { EstadoSolicitud } from '../../domain/entities/solicitud.entity';
import { NotificacionesService } from '../../../notificaciones/notificaciones.service';

@Injectable()
export class AprobarAdminUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
    private readonly notificaciones: NotificacionesService,
  ) {}

  async execute(id: string, id_admin: string): Promise<void> {
    const solicitud = await this.repo.obtenerPorId(id);
    if (!solicitud) throw new NotFoundException('Solicitud no encontrada');
    if (solicitud.estado !== EstadoSolicitud.PENDIENTE_ADMIN)
      throw new BadRequestException('La solicitud no está pendiente de aprobación del administrador');

    await this.repo.actualizar(id, {
      estado: EstadoSolicitud.PENDIENTE_BODEGA,
      id_admin,
      fecha_respuesta_admin: new Date(),
    });

    this.notificaciones.notificarActualizacion('solicitud');
  }
}
