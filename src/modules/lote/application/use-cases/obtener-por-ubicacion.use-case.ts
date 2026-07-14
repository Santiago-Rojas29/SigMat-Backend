import { Injectable, Inject } from '@nestjs/common';
import { Lote } from '../../domain/entities/lote.entity';
import type { LoteRepository } from '../../domain/ports/lote.repository';

@Injectable()
export class ObtenerLotesPorUbicacionUseCase {
  constructor(
    @Inject('LoteRepository')
    private readonly repo: LoteRepository,
  ) {}

  async execute(id_ubicacion: string): Promise<Lote[]> {
    return this.repo.obtenerPorUbicacion(id_ubicacion);
  }
}
