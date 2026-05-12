import { Injectable, Inject } from '@nestjs/common';
import type { ProgramaRepository } from '../../domain/ports/programa.repository';

@Injectable()
export class EliminarProgramaUseCase {
  constructor(
    @Inject('ProgramaRepository')
    private readonly repo: ProgramaRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.eliminar(id);
  }
}
