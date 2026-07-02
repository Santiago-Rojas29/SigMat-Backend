import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DevolucionUnidad, CondicionDevolucionUnidad } from '../../domain/entities/devolucion_unidad.entity';
import type { DevolucionUnidadRepository } from '../../domain/ports/devolucion_unidad.repository';
import { KardexAutoService } from '../../../kardex/application/services/kardex-auto.service';

const ESTADO_POR_CONDICION: Record<CondicionDevolucionUnidad, string> = {
  [CondicionDevolucionUnidad.BUENO]:      'disponible',
  [CondicionDevolucionUnidad.DANADO]:     'danado',
  [CondicionDevolucionUnidad.INCOMPLETO]: 'en mantenimiento',
};

@Injectable()
export class CrearDevolucionUnidadUseCase {
  constructor(
    @Inject('DevolucionUnidadRepository')
    private readonly repo: DevolucionUnidadRepository,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly kardexAuto: KardexAutoService,
  ) {}

  async execute(data: {
    id_devolucion: string;
    id_unidad: string;
    condicion_devolucion: CondicionDevolucionUnidad;
  }): Promise<DevolucionUnidad> {
    const entity = new DevolucionUnidad(data.id_devolucion, data.id_unidad, data.condicion_devolucion);
    entity.validar();
    const creada = await this.repo.crear(entity);

    await this.dataSource.query(`UPDATE unidad SET estado = $1 WHERE id_unidad = $2`, [
      ESTADO_POR_CONDICION[data.condicion_devolucion],
      data.id_unidad,
    ]);
    this.kardexAuto.entradaDevolucionUnidad(data.id_unidad, data.id_devolucion).catch(() => {});

    return creada;
  }
}
