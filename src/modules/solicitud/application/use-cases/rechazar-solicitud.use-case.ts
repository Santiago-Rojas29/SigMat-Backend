import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';
import { EstadoSolicitud } from '../../domain/entities/solicitud.entity';

const ESTADOS_TERMINALES = [
  EstadoSolicitud.ENTREGADO,
  EstadoSolicitud.RECHAZADO,
  EstadoSolicitud.CANCELADO,
];

@Injectable()
export class RechazarSolicitudUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
  ) {}

  async execute(id: string, motivo_rechazo?: string): Promise<void> {
    const solicitud = await this.repo.obtenerPorId(id);
    if (!solicitud) throw new NotFoundException('Solicitud no encontrada');
    if (ESTADOS_TERMINALES.includes(solicitud.estado))
      throw new BadRequestException('No se puede rechazar una solicitud ya finalizada');

    await this.repo.actualizar(id, {
      estado: EstadoSolicitud.RECHAZADO,
      motivo_rechazo: motivo_rechazo ?? null,
    });
  }
}
