import { Injectable, Inject } from '@nestjs/common';
import { Centro } from '../../domain/entities/centro.entity';
import type { CentroRepository } from '../../domain/ports/centro.repository';

@Injectable()
export class ActualizarCentroUseCase {
  constructor(
    @Inject('CentroRepository')
    private readonly repo: CentroRepository,
  ) {}

  async execute(
    id: string,
    data: {
      nombre?: string;
      ciudad?: string;
      direccion?: string;
      telefono?: string;
      estado?: string;
    },
  ): Promise<Centro> {
    const mapped: Partial<Centro> = {
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.ciudad && { ciudad: data.ciudad }),
      ...(data.direccion && { direccion: data.direccion }),
      ...(data.telefono && { telefono: data.telefono }),
      ...(data.estado && { estado: data.estado }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
