import { Inject, Injectable } from '@nestjs/common';
import { Devolucion, CondicionDevolucion } from '../../domain/entities/devolucion.entity';
import type { DevolucionRepository } from '../../domain/ports/devolucion.repository';
import { NotificacionesService } from '../../../notificaciones/notificaciones.service';

@Injectable()
export class CrearDevolucionUseCase {
  constructor(
    @Inject('DevolucionRepository')
    private readonly repo: DevolucionRepository,
    private readonly notificaciones: NotificacionesService,
  ) {}

  async execute(data: { id_entrega: string; fecha_devolucion: string; condicion: CondicionDevolucion; observaciones: string }): Promise<Devolucion> {
    const entity = new Devolucion('', data.id_entrega, new Date(data.fecha_devolucion), data.condicion, data.observaciones);
    entity.validar();
    const result = await this.repo.crear(entity);
    this.notificaciones.notificarActualizacion('prestamo');
    this.notificaciones.notificarDevolucion(data.id_entrega).catch(() => {});
    return result;
  }
}
