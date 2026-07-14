import { Injectable, Inject } from '@nestjs/common';
import { Permisos } from '../../domain/entities/permisos.entity';
import type { PermisosRepository } from '../../domain/ports/permisos.repository';

@Injectable()
export class ObtenerPorIdPermisosUseCase {
  constructor(
    @Inject('PermisosRepository')
    private readonly repo: PermisosRepository,
  ) {}

  async execute(id: string): Promise<Permisos | null> {
    return this.repo.obtenerPorId(id);
  }
}
