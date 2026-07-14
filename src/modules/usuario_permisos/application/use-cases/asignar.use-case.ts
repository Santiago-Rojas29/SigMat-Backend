import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { UsuarioPermisos } from '../../domain/entities/usuario_permisos.entity';
import type { UsuarioPermisosRepository } from '../../domain/ports/usuario_permisos.repository';

@Injectable()
export class AsignarUsuarioPermisosUseCase {
  constructor(
    @Inject('UsuarioPermisosRepository')
    private readonly repo: UsuarioPermisosRepository,
  ) {}

  async execute(data: {
    id_usuario: string;
    id_permiso: string;
    submodulos?: string[];
  }): Promise<UsuarioPermisos> {
    const existentes = await this.repo.obtenerPorUsuario(data.id_usuario);
    const yaExiste = existentes.find((up) => up.id_permiso === data.id_permiso);
    if (yaExiste) {
      throw new ConflictException(
        'El usuario ya tiene asignado ese permiso. Use PATCH para actualizar submodulos.',
      );
    }

    const entity = new UsuarioPermisos(
      '',
      data.id_usuario,
      data.id_permiso,
      data.submodulos ?? [],
    );
    entity.validar();
    return this.repo.asignar(entity);
  }
}
