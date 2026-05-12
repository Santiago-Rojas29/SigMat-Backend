import { Injectable, Inject } from '@nestjs/common';
import { SolicitudLote } from '../../domain/entities/solicitud_lote.entity';
import type { SolicitudLoteRepository } from '../../domain/ports/solicitud_lote.repository';

@Injectable()
export class ObtenerTodosUseCase {
  constructor(
    @Inject('SolicitudLoteRepository')
    private readonly repo: SolicitudLoteRepository,
  ) {}

  async execute(): Promise<SolicitudLote[]> {
    return this.repo.obtenerTodos();
  }
}
