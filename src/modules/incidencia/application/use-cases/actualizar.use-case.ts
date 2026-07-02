import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Incidencia, TipoIncidencia, EstadoIncidencia } from '../../domain/entities/incidencia.entity';
import type { IncidenciaRepository } from '../../domain/ports/incidencia.repository';
import { KardexAutoService } from '../../../kardex/application/services/kardex-auto.service';
import { NotificacionesService } from '../../../notificaciones/notificaciones.service';

@Injectable()
export class ActualizarIncidenciaUseCase {
  constructor(
    @Inject('IncidenciaRepository')
    private readonly repo: IncidenciaRepository,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly kardexAuto: KardexAutoService,
    private readonly notificaciones: NotificacionesService,
  ) {}

  async execute(
    id: string,
    data: {
      id_unidad?: string;
      id_usuario?: string;
      tipo?: TipoIncidencia;
      fecha_incidencia?: string;
      descripcion?: string;
      estado?: EstadoIncidencia;
    },
  ): Promise<Incidencia> {
    const existente = await this.repo.obtenerPorId(id);
    if (!existente) throw new NotFoundException('Incidencia no encontrada');

    const mapped: Partial<Incidencia> = {
      ...(data.id_unidad && { id_unidad: data.id_unidad }),
      ...(data.id_usuario && { id_usuario: data.id_usuario }),
      ...(data.tipo && { tipo: data.tipo }),
      ...(data.fecha_incidencia && { fecha_incidencia: new Date(data.fecha_incidencia) }),
      ...(data.descripcion && { descripcion: data.descripcion }),
      ...(data.estado && { estado: data.estado }),
    };
    const incidencia = await this.repo.actualizar(id, mapped);

    // Si la incidencia se cierra y no fue una pérdida, la unidad vuelve a estar disponible
    const seCierra = data.estado === EstadoIncidencia.CERRADA && existente.estado !== EstadoIncidencia.CERRADA;
    if (seCierra && existente.tipo !== TipoIncidencia.PERDIDA) {
      await this.dataSource.query(`UPDATE unidad SET estado = 'disponible' WHERE id_unidad = $1`, [
        existente.id_unidad,
      ]);
      this.kardexAuto.reingresoUnidad(existente.id_unidad, id).catch(() => {});
    }

    const estadoCambio = data.estado && data.estado !== existente.estado;
    const esEstadoNotificable =
      data.estado === EstadoIncidencia.EN_PROCESO || data.estado === EstadoIncidencia.CERRADA;
    if (estadoCambio && esEstadoNotificable) {
      this.notificaciones.notificarCambioEstadoIncidencia({
        incidenciaId: id,
        nuevoEstado:  data.estado!,
        id_creador:   existente.id_usuario,
      }).catch(() => {});
    }

    return incidencia;
  }
}
