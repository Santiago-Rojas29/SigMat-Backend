import { Injectable, Inject } from '@nestjs/common';
import { Validacion } from '../../domain/entities/validacion.entity';
import type { ValidacionRepository } from '../../domain/ports/validacion.repository';

@Injectable()
export class ObtenerTodosValidacionUseCase {
  constructor(
    @Inject('ValidacionRepository')
    private readonly repo: ValidacionRepository,
  ) {}

  async execute(): Promise<Validacion[]> {
    return this.repo.obtenerTodos();
  }
}
