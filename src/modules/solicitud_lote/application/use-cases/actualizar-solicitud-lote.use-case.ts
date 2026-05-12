import { Injectable, Inject } from '@nestjs/common';
import { SolicitudLote } from '../../domain/entities/solicitud_lote.entity';
import type { SolicitudLoteRepository } from '../../domain/ports/solicitud_lote.repository';

@Injectable()
export class ActualizarSolicitudLoteUseCase {
  constructor(
    @Inject('SolicitudLoteRepository')
    private readonly repo: SolicitudLoteRepository,
  ) {}

  async execute(
    id_solicitud: number,
    id_lote: number,
    data: {
      cantidad_solicitada?: number;
      id_usuario?: number;
    },
  ): Promise<SolicitudLote> {
    const mapped: Partial<SolicitudLote> = {
      ...(data.cantidad_solicitada !== undefined && { cantidad_solicitada: data.cantidad_solicitada }),
      ...(data.id_usuario !== undefined && { id_usuario: data.id_usuario }),
    };
    return this.repo.actualizar(id_solicitud, id_lote, mapped);
  }
}
