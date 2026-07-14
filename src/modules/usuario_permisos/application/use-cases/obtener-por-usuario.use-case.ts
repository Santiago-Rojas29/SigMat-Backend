import { Injectable, Inject } from '@nestjs/common';
import { UsuarioPermisos } from '../../domain/entities/usuario_permisos.entity';
import type { UsuarioPermisosRepository } from '../../domain/ports/usuario_permisos.repository';

@Injectable()
export class ObtenerPermisosDeUsuarioUseCase {
  constructor(
    @Inject('UsuarioPermisosRepository')
    private readonly repo: UsuarioPermisosRepository,
  ) {}

  async execute(id_usuario: string): Promise<UsuarioPermisos[]> {
    return this.repo.obtenerPorUsuario(id_usuario);
  }
}
