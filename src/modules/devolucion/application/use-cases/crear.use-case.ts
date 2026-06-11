import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Devolucion, CondicionDevolucion } from '../../domain/entities/devolucion.entity';
import type { DevolucionRepository } from '../../domain/ports/devolucion.repository';
import { NotificacionesService } from '../../../notificaciones/notificaciones.service';
import { KardexAutoService } from '../../../kardex/application/services/kardex-auto.service';

@Injectable()
export class CrearDevolucionUseCase {
  constructor(
    @Inject('DevolucionRepository')
    private readonly repo: DevolucionRepository,
    private readonly notificaciones: NotificacionesService,
    private readonly kardexAuto: KardexAutoService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async execute(data: { id_entrega: string; fecha_devolucion: string; condicion: CondicionDevolucion; observaciones: string }): Promise<Devolucion> {
    const entity = new Devolucion('', data.id_entrega, new Date(data.fecha_devolucion), data.condicion, data.observaciones);
    entity.validar();
    const result = await this.repo.crear(entity);
    await this.dataSource.query(
      `UPDATE unidad u SET estado = 'disponible'
       FROM entrega_unidad eu
       WHERE eu.id_entrega = $1 AND eu.id_unidad = u.id_unidad`,
      [data.id_entrega],
    );
    this.notificaciones.notificarActualizacion('prestamo');
    this.notificaciones.notificarDevolucion(data.id_entrega).catch(() => {});
    this.kardexAuto.entradaDevolucion(result.id, data.id_entrega).catch(() => {});
    return result;
  }
}
