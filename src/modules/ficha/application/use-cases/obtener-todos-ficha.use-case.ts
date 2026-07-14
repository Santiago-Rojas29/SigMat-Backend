import { Injectable, Inject } from '@nestjs/common';
import { Ficha } from '../../domain/entities/ficha.entity';
import type { FichaRepository } from '../../domain/ports/ficha.repository';

@Injectable()
export class ObtenerTodosFichaUseCase {
  constructor(
    @Inject('FichaRepository')
    private readonly repo: FichaRepository,
  ) { }

  async execute(): Promise<Ficha[]> {
    return this.repo.obtenerTodos();
  }
}
