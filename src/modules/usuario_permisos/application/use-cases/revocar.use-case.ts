import { Injectable, Inject } from '@nestjs/common';
import type { UsuarioPermisosRepository } from '../../domain/ports/usuario_permisos.repository';

@Injectable()
export class RevocarUsuarioPermisosUseCase {
  constructor(
    @Inject('UsuarioPermisosRepository')
    private readonly repo: UsuarioPermisosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return this.repo.revocar(id);
  }
}
