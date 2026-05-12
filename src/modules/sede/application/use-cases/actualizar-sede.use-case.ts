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
    id: number,
    data: {
      id_centro?: number;
      nombre?: string;
      direccion?: string;
      telefono?: string;
      estado?: string;
    },
  ): Promise<Sede> {
    const mapped: Partial<Sede> = { ...data };
    return this.repo.actualizar(id, mapped);
  }
}
