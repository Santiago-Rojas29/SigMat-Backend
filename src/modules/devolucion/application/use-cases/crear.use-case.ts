import { Inject, Injectable } from '@nestjs/common';
import { Devolucion, CondicionDevolucion } from '../../domain/entities/devolucion.entity';
import type { DevolucionRepository } from '../../domain/ports/devolucion.repository';

@Injectable()
export class CrearDevolucionUseCase {
  constructor(
    @Inject('DevolucionRepository')
    private readonly repo: DevolucionRepository,
  ) {}

  async execute(data: { id_entrega: string; fecha_devolucion: string; condicion: CondicionDevolucion; observaciones: string }): Promise<Devolucion> {
    const entity = new Devolucion('', data.id_entrega, new Date(data.fecha_devolucion), data.condicion, data.observaciones);
    entity.validar();
    return this.repo.crear(entity);
  }
}
