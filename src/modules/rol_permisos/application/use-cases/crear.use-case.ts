import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { RolPermisos } from '../../domain/entities/rol_permisos.entity';
import type { RolPermisosRepository } from '../../domain/ports/rol_permisos.repository';

@Injectable()
export class AsignarRolPermisosUseCase {
  constructor(
    @Inject('RolPermisosRepository')
    private readonly repo: RolPermisosRepository,
  ) {}

  async execute(data: {
    id_rol: string;
    id_permiso: string;
    submodulo?: string;
    acciones?: string[];
  }): Promise<RolPermisos> {
    const submodulo = data.submodulo ?? '';
    const existentes = await this.repo.obtenerPorRol(data.id_rol);
    const yaExiste = existentes.find(
      (rp) => rp.id_permiso === data.id_permiso && rp.submodulo === submodulo,
    );
    if (yaExiste) {
      throw new ConflictException(
        'El rol ya tiene asignado ese permiso para ese submódulo. Use PATCH para actualizar.',
      );
    }

    const entity = new RolPermisos(
      '',
      data.id_rol,
      data.id_permiso,
      submodulo,
      data.acciones ?? [],
    );
    entity.validar();
    return this.repo.asignar(entity);
  }
}
