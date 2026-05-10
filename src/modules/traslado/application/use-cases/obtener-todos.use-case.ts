import { Inject, Injectable } from '@nestjs/common';
import { Traslado } from '../../domain/entities/traslado.entity';
import type { TrasladoRepository } from '../../domain/ports/traslado.repository';

@Injectable()
export class ObtenerTodosTrasladoUseCase {
  constructor(
    @Inject('TrasladoRepository')
    private readonly repo: TrasladoRepository,
  ) {}

  async execute(): Promise<Traslado[]> {
    return this.repo.obtenerTodos();
  }
}
