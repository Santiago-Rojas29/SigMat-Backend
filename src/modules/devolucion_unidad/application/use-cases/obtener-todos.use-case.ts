import { Inject, Injectable } from '@nestjs/common';
import { DevolucionUnidad } from '../../domain/entities/devolucion_unidad.entity';
import type { DevolucionUnidadRepository } from '../../domain/ports/devolucion_unidad.repository';

@Injectable()
export class ObtenerTodosDevolucionUnidadUseCase {
  constructor(
    @Inject('DevolucionUnidadRepository')
    private readonly repo: DevolucionUnidadRepository,
  ) {}

  async execute(): Promise<DevolucionUnidad[]> {
    return this.repo.obtenerTodos();
  }
}
