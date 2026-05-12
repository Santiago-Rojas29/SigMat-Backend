import { Injectable, Inject } from '@nestjs/common';
import type { TipoUbicacionRepository } from '../../domain/ports/tipo_ubicacion.repository';

@Injectable()
export class EliminarTipoUbicacionUseCase {
  constructor(
    @Inject('TipoUbicacionRepository')
    private readonly repo: TipoUbicacionRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.eliminar(id);
  }
}
