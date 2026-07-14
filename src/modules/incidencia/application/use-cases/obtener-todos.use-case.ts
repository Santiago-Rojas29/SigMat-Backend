import { Inject, Injectable } from '@nestjs/common';
import { Incidencia } from '../../domain/entities/incidencia.entity';
import type { IncidenciaRepository } from '../../domain/ports/incidencia.repository';

@Injectable()
export class ObtenerTodosIncidenciaUseCase {
  constructor(
    @Inject('IncidenciaRepository')
    private readonly repo: IncidenciaRepository,
  ) {}

  async execute(): Promise<Incidencia[]> {
    return this.repo.obtenerTodos();
  }
}
