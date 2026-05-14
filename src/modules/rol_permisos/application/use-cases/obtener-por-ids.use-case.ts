import { Injectable, Inject } from '@nestjs/common';
import { RolPermisos } from '../../domain/entities/rol_permisos.entity';
import type { RolPermisosRepository } from '../../domain/ports/rol_permisos.repository';

@Injectable()
export class ObtenerPorIdsRolPermisosUseCase {
  constructor(
    @Inject('RolPermisosRepository')
    private readonly repo: RolPermisosRepository,
  ) {}

  async execute(id_rol: string, id_permiso: string): Promise<RolPermisos | null> {
    return this.repo.obtenerPorIds(id_rol, id_permiso);
  }
}
