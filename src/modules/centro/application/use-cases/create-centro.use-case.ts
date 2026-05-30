import type { CentroRepository } from '../../domain/ports/centro.repository';
import { Centro } from '../../domain/entities/centro.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateCentroUseCase {
  constructor(
    @Inject('CentroRepository')
    private readonly repo: CentroRepository,
  ) {}

  async execute(data: {
    nombre: string;
    ciudad: string;
    direccion: string;
    telefono: string;
    estado: string;
  }): Promise<Centro> {
    const entity = new Centro(
      '',
      data.nombre,
      data.ciudad,
      data.direccion,
      data.telefono,
      data.estado,
    );
    entity.validar();
    return this.repo.crear(entity);
  }
}
