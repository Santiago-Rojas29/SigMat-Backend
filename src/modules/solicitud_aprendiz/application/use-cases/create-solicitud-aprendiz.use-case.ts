import { Injectable, Inject } from '@nestjs/common';
import type { SolicitudAprendizRepository } from '../../domain/ports/solicitud_aprendiz.repository';
import { SolicitudAprendiz } from '../../domain/entities/solicitud_aprendiz.entity';

@Injectable()
export class CreateSolicitudAprendizUseCase {
  constructor(
    @Inject('SolicitudAprendizRepository')
    private readonly repo: SolicitudAprendizRepository,
  ) {}

  async execute(data: { id_solicitud: string; id_aprendiz: string }): Promise<SolicitudAprendiz> {
    const entity = new SolicitudAprendiz(data.id_solicitud, data.id_aprendiz);
    entity.validar();
    return this.repo.crear(entity);
  }
}
