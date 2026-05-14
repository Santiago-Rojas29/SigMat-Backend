import { Injectable, Inject } from '@nestjs/common';
import type { SolicitudLoteRepository } from '../../domain/ports/solicitud_lote.repository';

@Injectable()
export class EliminarSolicitudLoteUseCase {
  constructor(
    @Inject('SolicitudLoteRepository')
    private readonly repo: SolicitudLoteRepository,
  ) {}

  async execute(id_solicitud: string, id_lote: string): Promise<void> {
    await this.repo.eliminar(id_solicitud, id_lote);
  }
}
