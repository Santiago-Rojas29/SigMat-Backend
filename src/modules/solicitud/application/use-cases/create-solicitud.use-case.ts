import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';
import { Solicitud, TipoFlujo, TipoPrestamo, EstadoSolicitud } from '../../domain/entities/solicitud.entity';
import { NotificacionesService } from '../../../notificaciones/notificaciones.service';

@Injectable()
export class CreateSolicitudUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
    private readonly notificaciones: NotificacionesService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Instructor real de la ficha del aprendiz — nunca el que mande el frontend
   * (antes se tomaba del encargado de la ubicación elegida, que no tiene nada
   * que ver con la ficha). Si ninguno está disponible, igual se retorna uno
   * para conservar la atribución en reportes/estadísticas.
   */
  private async resolverInstructorFicha(id_aprendiz: string): Promise<{ id: string; disponible: boolean }[]> {
    return this.dataSource.query(
      `SELECT u.id, u.disponible
       FROM ficha_usuario fu_apr
       JOIN ficha_usuario fu_ins ON fu_ins.id_ficha = fu_apr.id_ficha AND fu_ins.rol_en_ficha = 'instructor'
       JOIN usuario u ON u.id = fu_ins.id_usuario
       WHERE fu_apr.id_usuario = $1 AND fu_apr.rol_en_ficha = 'aprendiz'`,
      [id_aprendiz],
    );
  }

  async execute(data: {
    id_solicitante: string;
    tipo_flujo:     TipoFlujo;
    tipo_prestamo:  TipoPrestamo;
    id_instructor?: string;
    id_bodega?:     string;
    observaciones?: string;
  }): Promise<Solicitud> {
    if (data.tipo_flujo === TipoFlujo.INSTRUCTOR && !data.id_bodega)
      throw new BadRequestException('Un instructor debe indicar el responsable de bodega');

    let idInstructorFinal: string | null = null;
    let saltoInstructor = false;
    let estadoInicial: EstadoSolicitud;

    if (data.tipo_flujo === TipoFlujo.APRENDIZ) {
      const instructores = await this.resolverInstructorFicha(data.id_solicitante);
      if (instructores.length === 0)
        throw new BadRequestException('El aprendiz no tiene ficha con instructor asignado');

      const disponible = instructores.find(i => i.disponible);
      idInstructorFinal = (disponible ?? instructores[0]).id;
      saltoInstructor = !disponible;

      estadoInicial = saltoInstructor
        ? (data.tipo_prestamo === TipoPrestamo.EXTERNO ? EstadoSolicitud.PENDIENTE_ADMIN : EstadoSolicitud.PENDIENTE_BODEGA)
        : EstadoSolicitud.PENDIENTE_INSTRUCTOR;
    } else {
      estadoInicial = data.tipo_prestamo === TipoPrestamo.EXTERNO
        ? EstadoSolicitud.PENDIENTE_ADMIN
        : EstadoSolicitud.PENDIENTE_BODEGA;
    }

    const entity = new Solicitud(
      '',
      data.id_solicitante,
      data.tipo_flujo,
      data.tipo_prestamo,
      estadoInicial,
      idInstructorFinal,
      null,
      data.id_bodega ?? null,
      data.observaciones ?? null,
      null,
      new Date(),
      null, null, null, null,
    );
    const result = await this.repo.crear(entity);
    this.notificaciones.notificarActualizacion('solicitud');

    if (data.tipo_flujo === TipoFlujo.APRENDIZ && saltoInstructor) {
      this.notificaciones.notificarInstructorNoDisponible(result.id_solicitud, idInstructorFinal!).catch(() => {});
      if (estadoInicial === EstadoSolicitud.PENDIENTE_ADMIN) {
        this.notificaciones.notificarPendienteAdmin(result.id_solicitud).catch(() => {});
      } else {
        this.notificaciones.notificarPendienteBodegaTodos(result.id_solicitud).catch(() => {});
      }
    } else {
      this.notificaciones.notificarNuevaSolicitud({
        solicitudId:   result.id_solicitud,
        tipo_flujo:    result.tipo_flujo,
        tipo_prestamo: result.tipo_prestamo,
        id_instructor: result.id_instructor,
        id_bodega:     result.id_bodega,
      }).catch(() => {});
    }

    return result;
  }
}
