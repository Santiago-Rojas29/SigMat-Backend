import { Injectable, Inject } from '@nestjs/common';
import type { AreaRepository } from '../../domain/ports/area.repository';
import { Area } from '../../domain/entities/area.entity';

@Injectable()
export class CreateAreaUseCase {
  constructor(
    @Inject('AreaRepository')
    private readonly repo: AreaRepository,
  ) {}

  async execute(data: {
    id_sede: number;
    id_usuario: number;
    nombre: string;
    descripcion: string;
    estado: string;
  }): Promise<Area> {
    const entity = new Area(
      0,
      data.id_sede,
      data.id_usuario,
      data.nombre,
      data.descripcion,
      data.estado,
    );
    return this.repo.crear(entity);
  }
}
