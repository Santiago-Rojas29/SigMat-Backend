import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';
import { EstadoSolicitud } from '../../domain/entities/solicitud.entity';

const ESTADOS_CANCELABLES = [
  EstadoSolicitud.PENDIENTE_INSTRUCTOR,
  EstadoSolicitud.PENDIENTE_ADMIN,
  EstadoSolicitud.PENDIENTE_BODEGA,
];

@Injectable()
export class CancelarSolicitudUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const solicitud = await this.repo.obtenerPorId(id);
    if (!solicitud) throw new NotFoundException('Solicitud no encontrada');
    if (!ESTADOS_CANCELABLES.includes(solicitud.estado))
      throw new BadRequestException('Solo se pueden cancelar solicitudes pendientes');

    await this.repo.actualizar(id, { estado: EstadoSolicitud.CANCELADO });
  }
}
