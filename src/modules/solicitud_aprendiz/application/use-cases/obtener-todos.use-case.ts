import { Injectable, Inject } from '@nestjs/common';
import type { SolicitudAprendizRepository } from '../../domain/ports/solicitud_aprendiz.repository';
import { SolicitudAprendiz } from '../../domain/entities/solicitud_aprendiz.entity';

@Injectable()
export class ObtenerTodosUseCase {
  constructor(
    @Inject('SolicitudAprendizRepository')
    private readonly repo: SolicitudAprendizRepository,
  ) {}

  async execute(): Promise<SolicitudAprendiz[]> {
    return this.repo.obtenerTodos();
  }
}
