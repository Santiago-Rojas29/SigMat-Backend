import { Injectable, Inject } from '@nestjs/common';
import type { TipoUbicacionRepository } from '../../domain/ports/tipo_ubicacion.repository';
import { TipoUbicacion } from '../../domain/entities/tipo_ubicacion.entity';

@Injectable()
export class CreateTipoUbicacionUseCase {
  constructor(
    @Inject('TipoUbicacionRepository')
    private readonly repo: TipoUbicacionRepository,
  ) {}

  async execute(data: {
    nombre: string;
    descripcion: string;
  }): Promise<TipoUbicacion> {
    const entity = new TipoUbicacion(
      "",
      data.nombre,
      data.descripcion,
    );
    return this.repo.crear(entity);
  }
}
