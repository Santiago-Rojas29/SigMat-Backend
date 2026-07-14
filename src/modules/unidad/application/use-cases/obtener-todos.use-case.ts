import { Injectable, Inject } from '@nestjs/common';
import { Unidad } from '../../domain/entities/unidad.entity';
import type { UnidadRepository } from '../../domain/ports/unidad.repository';

@Injectable()
export class ObtenerTodosUseCase {
  constructor(
    @Inject('UnidadRepository')
    private readonly repo: UnidadRepository,
  ) {}

  async execute(): Promise<Unidad[]> {
    return this.repo.obtenerTodos();
  }
}
