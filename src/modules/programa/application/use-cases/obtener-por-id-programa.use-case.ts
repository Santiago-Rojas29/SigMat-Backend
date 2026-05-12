import { Injectable, Inject } from '@nestjs/common';
import { Programa } from '../../domain/entities/programa.entity';
import type { ProgramaRepository } from '../../domain/ports/programa.repository';

@Injectable()
export class ObtenerPorIdProgramaUseCase {
  constructor(
    @Inject('ProgramaRepository')
    private readonly repo: ProgramaRepository,
  ) {}

  async execute(id: number): Promise<Programa | null> {
    return this.repo.obtenerPorId(id);
  }
}
