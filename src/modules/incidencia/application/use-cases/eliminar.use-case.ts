import { Inject, Injectable } from '@nestjs/common';
import type { IncidenciaRepository } from '../../domain/ports/incidencia.repository';

@Injectable()
export class EliminarIncidenciaUseCase {
  constructor(
    @Inject('IncidenciaRepository')
    private readonly repo: IncidenciaRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
