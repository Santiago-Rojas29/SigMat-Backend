import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { SolicitudAprendizRepository } from '../../domain/ports/solicitud_aprendiz.repository';
import { SolicitudAprendiz } from '../../domain/entities/solicitud_aprendiz.entity';

@Injectable()
export class ObtenerPorIdUseCase {
  constructor(
    @Inject('SolicitudAprendizRepository')
    private readonly repo: SolicitudAprendizRepository,
  ) {}

  async execute(id_solicitud: string, id_aprendiz: string): Promise<SolicitudAprendiz> {
    const result = await this.repo.obtenerPorId(id_solicitud, id_aprendiz);
    if (!result) throw new NotFoundException('Registro solicitud-aprendiz no encontrado');
    return result;
  }
}
