import { Injectable, Inject } from '@nestjs/common';
import type { SolicitudAprendizRepository } from '../../domain/ports/solicitud_aprendiz.repository';

@Injectable()
export class EliminarSolicitudAprendizUseCase {
  constructor(
    @Inject('SolicitudAprendizRepository')
    private readonly repo: SolicitudAprendizRepository,
  ) {}

  async execute(id_solicitud: string, id_aprendiz: string): Promise<void> {
    return this.repo.eliminar(id_solicitud, id_aprendiz);
  }
}
