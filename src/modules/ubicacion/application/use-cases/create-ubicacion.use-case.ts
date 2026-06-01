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
    id_area: string;
    id_tipo_ubicacion: string;
    nombre: string;
    descripcion: string;
    estado: string;
    id_encargado?: string | null;
  }): Promise<Ubicacion> {
    const entity = new Ubicacion(
      '',
      data.id_area,
      data.id_tipo_ubicacion,
      data.nombre,
      data.descripcion,
      data.estado,
      data.id_encargado ?? null,
    );
    entity.validar();
    return this.repo.crear(entity);
  }
}
