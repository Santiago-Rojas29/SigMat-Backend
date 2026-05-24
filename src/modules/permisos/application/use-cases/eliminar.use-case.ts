import { Injectable, Inject } from '@nestjs/common';
import type { PermisosRepository } from '../../domain/ports/permisos.repository';

@Injectable()
export class EliminarPermisosUseCase {
  constructor(
    @Inject('PermisosRepository')
    private readonly repo: PermisosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
