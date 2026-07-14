import { Injectable, Inject } from '@nestjs/common';
import { Unidad } from '../../domain/entities/unidad.entity';
import type { UnidadRepository } from '../../domain/ports/unidad.repository';

@Injectable()
export class ObtenerPorIdUseCase {
  constructor(
    @Inject('UnidadRepository')
    private readonly repo: UnidadRepository,
  ) {}

  async execute(id: string): Promise<Unidad | null> {
    return this.repo.obtenerPorId(id);
  }
}
