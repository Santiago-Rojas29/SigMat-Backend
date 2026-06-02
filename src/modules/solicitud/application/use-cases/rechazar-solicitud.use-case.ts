import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';
import { EstadoSolicitud } from '../../domain/entities/solicitud.entity';
import { NotificacionesService } from '../../../notificaciones/notificaciones.service';

export enum RolRechazador {
  INSTRUCTOR  = 'instructor',
  ADMIN       = 'admin',
  BODEGA      = 'bodega',
}

const ESTADOS_TERMINALES = [
  EstadoSolicitud.ENTREGADO,
  EstadoSolicitud.RECHAZADO,
  EstadoSolicitud.CANCELADO,
];

const ESTADOS_POR_ROL: Record<RolRechazador, EstadoSolicitud[]> = {
  [RolRechazador.INSTRUCTOR]: [EstadoSolicitud.PENDIENTE_INSTRUCTOR],
  [RolRechazador.ADMIN]:      [EstadoSolicitud.PENDIENTE_ADMIN],
  [RolRechazador.BODEGA]:     [EstadoSolicitud.PENDIENTE_BODEGA, EstadoSolicitud.APROBADO],
};

@Injectable()
export class RechazarSolicitudUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
    private readonly notificaciones: NotificacionesService,
  ) {}

  async execute(id: string, rol: RolRechazador, motivo_rechazo?: string): Promise<void> {
    const solicitud = await this.repo.obtenerPorId(id);
    if (!solicitud) throw new NotFoundException('Solicitud no encontrada');
    if (ESTADOS_TERMINALES.includes(solicitud.estado))
      throw new BadRequestException('No se puede rechazar una solicitud ya finalizada');

    const estadosPermitidos = ESTADOS_POR_ROL[rol];
    if (!estadosPermitidos.includes(solicitud.estado))
      throw new BadRequestException(
        `Un ${rol} no puede rechazar una solicitud en estado "${solicitud.estado}"`,
      );

    await this.repo.actualizar(id, {
      estado: EstadoSolicitud.RECHAZADO,
      motivo_rechazo: motivo_rechazo ?? null,
    });

    await this.notificaciones.notificarCambioEstado(id, EstadoSolicitud.RECHAZADO);
  }
}
