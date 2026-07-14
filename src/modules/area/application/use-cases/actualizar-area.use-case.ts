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
    const mapped: Partial<Area> = {
      ...(data.id_sede !== undefined && { id_sede: data.id_sede }),
      ...(data.id_usuario !== undefined && { id_usuario: data.id_usuario }),
      ...(data.nombre !== undefined && { nombre: data.nombre }),
      ...(data.descripcion !== undefined && { descripcion: data.descripcion }),
      ...(data.estado !== undefined && { estado: data.estado }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
