import { Injectable, Inject } from '@nestjs/common';
import type { SedeRepository } from '../../domain/ports/sede.repository';
import { Sede } from '../../domain/entities/sede.entity';

@Injectable()
export class CreateSedeUseCase {
  constructor(
    @Inject('SedeRepository')
    private readonly repo: SedeRepository,
  ) {}

  async execute(data: {
    id_centro: number;
    nombre: string;
    direccion: string;
    telefono: string;
    estado: string;
  }): Promise<Sede> {
    const entity = new Sede(
      0,
      data.id_centro,
      data.nombre,
      data.direccion,
      data.telefono,
      data.estado,
    );
    return this.repo.crear(entity);
  }
}
