import { Inject, Injectable } from '@nestjs/common';
import { DevolucionUnidad, CondicionDevolucionUnidad } from '../../domain/entities/devolucion_unidad.entity';
import type { DevolucionUnidadRepository } from '../../domain/ports/devolucion_unidad.repository';

@Injectable()
export class CrearDevolucionUnidadUseCase {
  constructor(
    @Inject('DevolucionUnidadRepository')
    private readonly repo: DevolucionUnidadRepository,
  ) {}

  async execute(data: {
    id_devolucion: string;
    id_unidad: string;
    condicion_devolucion: CondicionDevolucionUnidad;
  }): Promise<DevolucionUnidad> {
    const entity = new DevolucionUnidad(data.id_devolucion, data.id_unidad, data.condicion_devolucion);
    entity.validar();
    return this.repo.crear(entity);
  }
}
