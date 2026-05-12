import { Injectable, Inject } from '@nestjs/common';
import type { SolicitudUnidadRepository } from '../../domain/ports/solicitud_unidad.repository';

@Injectable()
export class EliminarSolicitudUnidadUseCase {
  constructor(
    @Inject('SolicitudUnidadRepository')
    private readonly repo: SolicitudUnidadRepository,
  ) {}

  async execute(id_solicitud: number, id_unidad: number): Promise<void> {
    await this.repo.eliminar(id_solicitud, id_unidad);
  }
}
