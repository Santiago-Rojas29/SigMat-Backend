import { Injectable, Inject } from '@nestjs/common';
import type { AuthRepository } from '../../domain/ports/auth.repository';

@Injectable()
export class ObtenerMisPermisosUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly repo: AuthRepository,
  ) {}

  async execute(id_usuario: string): Promise<{ modulos: string[] }> {
    const modulos = await this.repo.obtenerModulosPorUsuario(id_usuario);
    return { modulos };
  }
}
