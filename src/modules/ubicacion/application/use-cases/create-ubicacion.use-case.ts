import { Injectable, Inject } from '@nestjs/common';
import type { UbicacionRepository } from '../../domain/ports/ubicacion.repository';
import { Ubicacion } from '../../domain/entities/ubicacion.entity';

@Injectable()
export class CreateUbicacionUseCase {
  constructor(
    @Inject('UbicacionRepository')
    private readonly repo: UbicacionRepository,
  ) {}

  async execute(data: {
    id_area: number;
    id_tipo_ubicacion: number;
    nombre: string;
    descripcion: string;
    estado: string;
  }): Promise<Ubicacion> {
    const entity = new Ubicacion(
      0,
      data.id_area,
      data.id_tipo_ubicacion,
      data.nombre,
      data.descripcion,
      data.estado,
    );
    return this.repo.crear(entity);
  }
}
