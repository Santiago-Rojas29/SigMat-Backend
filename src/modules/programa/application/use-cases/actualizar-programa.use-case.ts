import { Injectable, Inject } from '@nestjs/common';
import { Programa } from '../../domain/entities/programa.entity';
import type { ProgramaRepository } from '../../domain/ports/programa.repository';

@Injectable()
export class ActualizarProgramaUseCase {
  constructor(
    @Inject('ProgramaRepository')
    private readonly repo: ProgramaRepository,
  ) { }

  async execute(
    id: string,
    data: {
      id_area?: string;
      nombre?: string;
      codigo_programa?: string;
      nivel_formacion?: string;
      estado?: string;
    },
  ): Promise<Programa> {
    const mapped: Partial<Programa> = {
      ...(data.id_area !== undefined && { id_area: data.id_area }),
      ...(data.nombre !== undefined && { nombre: data.nombre }),
      ...(data.codigo_programa !== undefined && { codigo_programa: data.codigo_programa }),
      ...(data.nivel_formacion !== undefined && { nivel_formacion: data.nivel_formacion }),
      ...(data.estado !== undefined && { estado: data.estado }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
