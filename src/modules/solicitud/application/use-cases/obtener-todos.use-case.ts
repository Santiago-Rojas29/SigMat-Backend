import { Injectable, Inject } from '@nestjs/common';
import { Solicitud } from '../../domain/entities/solicitud.entity';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';

@Injectable()
export class ObtenerTodosUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
  ) {}

  async execute(): Promise<Solicitud[]> {
    return this.repo.obtenerTodos();
  }
}
