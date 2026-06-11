import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { RolPermisos } from '../../domain/entities/rol_permisos.entity';
import type { RolPermisosRepository } from '../../domain/ports/rol_permisos.repository';

@Injectable()
export class ActualizarRolPermisosUseCase {
  constructor(
    @Inject('RolPermisosRepository')
    private readonly repo: RolPermisosRepository,
  ) {}

  async execute(id: string, submodulos: string[], acciones: string[]): Promise<RolPermisos> {
    const existing = await this.repo.obtenerPorId(id);
    if (!existing) throw new NotFoundException(`Asignación con id ${id} no encontrada`);
    return this.repo.actualizar(id, submodulos, acciones);
  }
}
