import { Injectable, Inject } from '@nestjs/common';
import { RolPermisos } from '../../domain/entities/rol_permisos.entity';
import type { RolPermisosRepository } from '../../domain/ports/rol_permisos.repository';

@Injectable()
export class CrearRolPermisosUseCase {
  constructor(
    @Inject('RolPermisosRepository')
    private readonly repo: RolPermisosRepository,
  ) {}

  async execute(data: { id_rol: string; id_permiso: string }): Promise<RolPermisos> {
    const entity = new RolPermisos(data.id_rol, data.id_permiso);
    entity.validar();
    return this.repo.crear(entity);
  }
}
