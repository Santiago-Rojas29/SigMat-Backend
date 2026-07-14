import { Injectable, Inject } from '@nestjs/common';
import { Unidad } from '../../domain/entities/unidad.entity';
import type { UnidadRepository } from '../../domain/ports/unidad.repository';

@Injectable()
export class ObtenerUnidadesPorUbicacionUseCase {
  constructor(
    @Inject('UnidadRepository')
    private readonly repo: UnidadRepository,
  ) {}

  async execute(id_ubicacion: string): Promise<Unidad[]> {
    return this.repo.obtenerPorUbicacion(id_ubicacion);
  }
}
