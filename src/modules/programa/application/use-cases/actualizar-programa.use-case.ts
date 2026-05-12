import { Injectable, Inject } from '@nestjs/common';
import { Programa } from '../../domain/entities/programa.entity';
import type { ProgramaRepository } from '../../domain/ports/programa.repository';

@Injectable()
export class ActualizarProgramaUseCase {
  constructor(
    @Inject('ProgramaRepository')
    private readonly repo: ProgramaRepository,
  ) {}

  async execute(
    id: number,
    data: {
      id_area?: number;
      nombre?: string;
      codigo_programa?: string;
      nivel_formacion?: string;
      estado?: string;
    },
  ): Promise<Programa> {
    const mapped: Partial<Programa> = { ...data };
    return this.repo.actualizar(id, mapped);
  }
}
