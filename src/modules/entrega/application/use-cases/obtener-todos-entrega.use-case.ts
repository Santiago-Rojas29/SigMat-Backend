import { Injectable, Inject } from '@nestjs/common';
import { Entrega } from '../../domain/entities/entrega.entity';
import type { EntregaRepository } from '../../domain/ports/entrega.repository';

@Injectable()
export class ObtenerTodosEntregaUseCase {
  constructor(
    @Inject('EntregaRepository')
    private readonly repo: EntregaRepository,
  ) {}

  async execute(): Promise<Entrega[]> {
    return this.repo.obtenerTodos();
  }
}
