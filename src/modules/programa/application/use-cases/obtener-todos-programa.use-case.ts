import { Injectable, Inject } from '@nestjs/common';
import { Programa } from '../../domain/entities/programa.entity';
import type { ProgramaRepository } from '../../domain/ports/programa.repository';

@Injectable()
export class ObtenerTodosProgramaUseCase {
  constructor(
    @Inject('ProgramaRepository')
    private readonly repo: ProgramaRepository,
  ) { }

  async execute(): Promise<Programa[]> {
    return this.repo.obtenerTodos();
  }
}
