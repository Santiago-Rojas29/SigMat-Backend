import { Inject, Injectable } from '@nestjs/common';
import { DevolucionUnidad } from '../../domain/entities/devolucion_unidad.entity';
import type { DevolucionUnidadRepository } from '../../domain/ports/devolucion_unidad.repository';

@Injectable()
export class ObtenerPorIdsDevolucionUnidadUseCase {
  constructor(
    @Inject('DevolucionUnidadRepository')
    private readonly repo: DevolucionUnidadRepository,
  ) {}

  async execute(id_devolucion: string, id_unidad: string): Promise<DevolucionUnidad | null> {
    return this.repo.obtenerPorIds(id_devolucion, id_unidad);
  }
}
