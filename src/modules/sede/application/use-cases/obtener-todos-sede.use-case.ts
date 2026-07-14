import { Injectable, Inject } from '@nestjs/common';
import { Sede } from '../../domain/entities/sede.entity';
import type { SedeRepository } from '../../domain/ports/sede.repository';

@Injectable()
export class ObtenerTodosSedeUseCase {
  constructor(
    @Inject('SedeRepository')
    private readonly repo: SedeRepository,
  ) {}

  async execute(): Promise<Sede[]> {
    return this.repo.obtenerTodos();
  }
}
