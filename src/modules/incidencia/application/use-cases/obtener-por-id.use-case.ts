import { Inject, Injectable } from '@nestjs/common';
import { Incidencia } from '../../domain/entities/incidencia.entity';
import type { IncidenciaRepository } from '../../domain/ports/incidencia.repository';

@Injectable()
export class ObtenerPorIdIncidenciaUseCase {
  constructor(
    @Inject('IncidenciaRepository')
    private readonly repo: IncidenciaRepository,
  ) {}

  async execute(id: string): Promise<Incidencia | null> {
    return this.repo.obtenerPorId(id);
  }
}
