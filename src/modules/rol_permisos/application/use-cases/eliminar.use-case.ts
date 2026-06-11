import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { RolPermisosRepository } from '../../domain/ports/rol_permisos.repository';

@Injectable()
export class EliminarRolPermisosUseCase {
  constructor(
    @Inject('RolPermisosRepository')
    private readonly repo: RolPermisosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repo.obtenerPorId(id);
    if (!existing) throw new NotFoundException(`Asignación con id ${id} no encontrada`);
    return this.repo.eliminar(id);
  }
}
