import { Injectable, Inject } from '@nestjs/common';
import type { FichaRepository } from '../../domain/ports/ficha.repository';
import { Ficha } from '../../domain/entities/ficha.entity';

@Injectable()
export class CreateFichaUseCase {
  constructor(
    @Inject('FichaRepository')
    private readonly repo: FichaRepository,
  ) { }

  async execute(data: {
    id_programa: string;
    codigo_ficha: string;
    fecha_inicio: string;
    fecha_fin: string;
    jornada: string;
    estado: string;
  }): Promise<Ficha> {
    const entity = new Ficha(
      "0",
      data.id_programa,
      data.codigo_ficha,
      new Date(data.fecha_inicio),
      new Date(data.fecha_fin),
      data.jornada,
      data.estado,
    );
    return this.repo.crear(entity);
  }
}
