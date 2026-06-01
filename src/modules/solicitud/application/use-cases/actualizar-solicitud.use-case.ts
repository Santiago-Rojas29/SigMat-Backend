import { Injectable, Inject } from '@nestjs/common';
import { Solicitud } from '../../domain/entities/solicitud.entity';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';

@Injectable()
export class ActualizarSolicitudUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
  ) {}

  async execute(id: string, data: { observaciones?: string }): Promise<Solicitud> {
    const mapped: Partial<Solicitud> = {
      ...(data.observaciones !== undefined && { observaciones: data.observaciones }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
