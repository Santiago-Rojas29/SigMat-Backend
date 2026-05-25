import { Injectable, Inject } from '@nestjs/common';
import { SolicitudLote } from '../../domain/entities/solicitud_lote.entity';
import type { SolicitudLoteRepository } from '../../domain/ports/solicitud_lote.repository';

@Injectable()
export class ObtenerPorIdUseCase {
  constructor(
    @Inject('SolicitudLoteRepository')
    private readonly repo: SolicitudLoteRepository,
  ) {}

  async execute(id_solicitud: string, id_lote: string): Promise<SolicitudLote | null> {
    return this.repo.obtenerPorId(id_solicitud, id_lote);
  }
}
