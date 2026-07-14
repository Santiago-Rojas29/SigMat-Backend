import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Incidencia, TipoIncidencia, EstadoIncidencia } from '../../domain/entities/incidencia.entity';
import type { IncidenciaRepository } from '../../domain/ports/incidencia.repository';
import { KardexAutoService } from '../../../kardex/application/services/kardex-auto.service';
import { NotificacionesService } from '../../../notificaciones/notificaciones.service';

const ESTADO_UNIDAD_POR_TIPO: Record<TipoIncidencia, string> = {
  [TipoIncidencia.DANO]: 'danado',
  [TipoIncidencia.PERDIDA]: 'perdido',
  [TipoIncidencia.MANTENIMIENTO]: 'en mantenimiento',
};

@Injectable()
export class CrearIncidenciaUseCase {
  constructor(
    @Inject('IncidenciaRepository')
    private readonly repo: IncidenciaRepository,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly kardexAuto: KardexAutoService,
    private readonly notificaciones: NotificacionesService,
  ) {}

  async execute(data: {
    id_unidad: string;
    id_usuario: string;
    tipo: TipoIncidencia;
    fecha_incidencia: string;
    descripcion: string;
    estado: EstadoIncidencia;
  }): Promise<Incidencia> {
    const entity = new Incidencia(
      '',
      data.id_unidad,
      data.id_usuario,
      data.tipo,
      new Date(data.fecha_incidencia),
      data.descripcion,
      data.estado,
    );
    entity.validar();

    const incidencia = await this.repo.crear(entity);

    await this.dataSource.query(`UPDATE unidad SET estado = $1 WHERE id_unidad = $2`, [
      ESTADO_UNIDAD_POR_TIPO[data.tipo],
      data.id_unidad,
    ]);
    this.kardexAuto.bajaUnidad(data.id_unidad, incidencia.id).catch(() => {});
    this.notificaciones.notificarNuevaIncidencia({
      incidenciaId: incidencia.id,
      tipo:         data.tipo,
      id_creador:   data.id_usuario,
    }).catch(() => {});

    return incidencia;
  }
}
