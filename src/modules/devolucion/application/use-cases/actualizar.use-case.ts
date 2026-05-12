import { Inject, Injectable } from '@nestjs/common';
import type { DevolucionRepository } from '../../domain/ports/devolucion.repository';
import { CondicionDevolucion, Devolucion } from '../../domain/entities/devolucion.entity';

@Injectable()
export class ActualizarDevolucionUseCase {
  constructor(
    @Inject('DevolucionRepository')
    private readonly repo: DevolucionRepository,
  ) {}

  async execute(
    id: string,
    data: { id_entrega?: string; fecha_devolucion?: string; condicion?: CondicionDevolucion; observaciones?: string },
  ): Promise<Devolucion> {
    const mapped: Partial<Devolucion> = {
      ...(data.id_entrega && { id_entrega: data.id_entrega }),
      ...(data.fecha_devolucion && { fecha_devolucion: new Date(data.fecha_devolucion) }),
      ...(data.condicion && { condicion: data.condicion }),
      ...(data.observaciones && { observaciones: data.observaciones }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
