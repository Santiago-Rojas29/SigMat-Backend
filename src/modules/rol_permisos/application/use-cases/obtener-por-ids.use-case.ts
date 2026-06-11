import { Injectable, Inject } from '@nestjs/common';
import { RolPermisos } from '../../domain/entities/rol_permisos.entity';
import type { RolPermisosRepository } from '../../domain/ports/rol_permisos.repository';

@Injectable()
export class ObtenerPorRolUseCase {
  constructor(
    @Inject('RolPermisosRepository')
    private readonly repo: RolPermisosRepository,
  ) {}

  async execute(id_rol: string): Promise<RolPermisos[]> {
    return this.repo.obtenerPorRol(id_rol);
  }
}
