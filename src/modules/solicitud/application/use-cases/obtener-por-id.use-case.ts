import { Injectable, Inject } from '@nestjs/common';
import { Solicitud } from '../../domain/entities/solicitud.entity';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';

@Injectable()
export class ObtenerPorIdUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
  ) {}

  async execute(id: string): Promise<Solicitud | null> {
    return this.repo.obtenerPorId(id);
  }
}
