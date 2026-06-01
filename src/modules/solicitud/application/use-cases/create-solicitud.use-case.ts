import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';
import { Solicitud, TipoFlujo, TipoPrestamo, EstadoSolicitud } from '../../domain/entities/solicitud.entity';

@Injectable()
export class CreateSolicitudUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
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
    return this.repo.crear(entity);
  }
}
