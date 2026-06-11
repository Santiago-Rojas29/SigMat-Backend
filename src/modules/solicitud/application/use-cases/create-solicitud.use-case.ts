import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';
import { Solicitud, TipoFlujo, TipoPrestamo, EstadoSolicitud } from '../../domain/entities/solicitud.entity';
import { NotificacionesService } from '../../../notificaciones/notificaciones.service';

@Injectable()
export class CreateSolicitudUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
    private readonly notificaciones: NotificacionesService,
  ) {}

  async execute(data: {
    id_solicitante: string;
    tipo_flujo:     TipoFlujo;
    tipo_prestamo:  TipoPrestamo;
    id_instructor?: string;
    id_bodega?:     string;
    observaciones?: string;
  }): Promise<Solicitud> {
    if (data.tipo_flujo === TipoFlujo.APRENDIZ && !data.id_instructor)
      throw new BadRequestException('Un aprendiz debe indicar su instructor');
    if (data.tipo_flujo === TipoFlujo.INSTRUCTOR && !data.id_bodega)
      throw new BadRequestException('Un instructor debe indicar el responsable de bodega');

    const estadoInicial = data.tipo_flujo === TipoFlujo.APRENDIZ
      ? EstadoSolicitud.PENDIENTE_INSTRUCTOR
      : data.tipo_prestamo === TipoPrestamo.EXTERNO
        ? EstadoSolicitud.PENDIENTE_ADMIN
        : EstadoSolicitud.PENDIENTE_BODEGA;

    const entity = new Solicitud(
      '',
      data.id_solicitante,
      data.tipo_flujo,
      data.tipo_prestamo,
      estadoInicial,
      data.id_instructor ?? null,
      null,
      data.id_bodega ?? null,
      data.observaciones ?? null,
      null,
      new Date(),
      null, null, null, null,
    );
    const result = await this.repo.crear(entity);
    this.notificaciones.notificarActualizacion('solicitud');
    this.notificaciones.notificarNuevaSolicitud({
      solicitudId:   result.id_solicitud,
      tipo_flujo:    result.tipo_flujo,
      tipo_prestamo: result.tipo_prestamo,
      id_instructor: result.id_instructor,
      id_bodega:     result.id_bodega,
    }).catch(() => {});
    return result;
  }
}
