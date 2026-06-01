import { Injectable, Inject } from '@nestjs/common';
import type { UsuarioPermisosRepository } from '../../domain/ports/usuario_permisos.repository';

@Injectable()
export class RevocarTodosPermisosUseCase {
  constructor(
    @Inject('UsuarioPermisosRepository')
    private readonly repo: UsuarioPermisosRepository,
  ) {}

  async execute(id_usuario: string): Promise<void> {
    return this.repo.revocarTodosPorUsuario(id_usuario);
  }
}
