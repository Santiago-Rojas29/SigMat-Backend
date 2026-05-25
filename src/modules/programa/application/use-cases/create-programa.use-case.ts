import { Injectable, Inject } from '@nestjs/common';
import type { ProgramaRepository } from '../../domain/ports/programa.repository';
import { Programa } from '../../domain/entities/programa.entity';

@Injectable()
export class CreateProgramaUseCase {
  constructor(
    @Inject('ProgramaRepository')
    private readonly repo: ProgramaRepository,
  ) { }

  async execute(data: {
    id_area: string;
    nombre: string;
    codigo_programa: string;
    nivel_formacion: string;
    estado: string;
  }): Promise<Programa> {
    const entity = new Programa(
      "0",
      data.id_area,
      data.nombre,
      data.codigo_programa,
      data.nivel_formacion,
      data.estado,
    );
    return this.repo.crear(entity);
  }
}
