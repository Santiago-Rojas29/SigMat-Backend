import { Injectable, Inject } from '@nestjs/common';
import { Area } from '../../domain/entities/area.entity';
import type { AreaRepository } from '../../domain/ports/area.repository';

@Injectable()
export class ActualizarAreaUseCase {
  constructor(
    @Inject('AreaRepository')
    private readonly repo: AreaRepository,
  ) { }

  async execute(
    id: string,
    data: {
      id_sede?: string;
      id_usuario?: string;
      nombre?: string;
      descripcion?: string;
      estado?: string;
    },
  ): Promise<Area> {
    const mapped: Partial<Area> = { ...data };
    return this.repo.actualizar(id, mapped);
  }
}
