import { Injectable, Inject } from '@nestjs/common';
import type { SolicitudLoteRepository } from '../../domain/ports/solicitud_lote.repository';
import { SolicitudLote } from '../../domain/entities/solicitud_lote.entity';

@Injectable()
export class CreateSolicitudLoteUseCase {
  constructor(
    @Inject('SolicitudLoteRepository')
    private readonly repo: SolicitudLoteRepository,
  ) {}

  async execute(data: {
    id_solicitud: number;
    id_lote: number;
    cantidad_solicitada: number;
    id_usuario: number;
  }): Promise<SolicitudLote> {
    const entity = new SolicitudLote(
      data.id_solicitud,
      data.id_lote,
      data.cantidad_solicitada,
      data.id_usuario,
    );
    return this.repo.crear(entity);
  }
}
