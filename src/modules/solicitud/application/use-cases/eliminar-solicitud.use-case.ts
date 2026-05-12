import { Injectable, Inject } from '@nestjs/common';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';

@Injectable()
export class EliminarSolicitudUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.eliminar(id);
  }
}
