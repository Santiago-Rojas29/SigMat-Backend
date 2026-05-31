import { Injectable, Inject } from '@nestjs/common';
import { Sede } from '../../domain/entities/sede.entity';
import type { SedeRepository } from '../../domain/ports/sede.repository';

@Injectable()
export class ActualizarSedeUseCase {
  constructor(
    @Inject('SedeRepository')
    private readonly repo: SedeRepository,
  ) {}

  async execute(
    id: string,
    data: {
      id_centro?: string;
      nombre?: string;
      direccion?: string;
      telefono?: string;
      estado?: string;
    },
  ): Promise<Sede> {
    const mapped: Partial<Sede> = {
      ...(data.id_centro !== undefined && { id_centro: data.id_centro }),
      ...(data.nombre !== undefined && { nombre: data.nombre }),
      ...(data.direccion !== undefined && { direccion: data.direccion }),
      ...(data.telefono !== undefined && { telefono: data.telefono }),
      ...(data.estado !== undefined && { estado: data.estado }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
