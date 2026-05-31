import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UsuarioPermisos } from '../../domain/entities/usuario_permisos.entity';
import type { UsuarioPermisosRepository } from '../../domain/ports/usuario_permisos.repository';

@Injectable()
export class ActualizarSubmodulosUseCase {
  constructor(
    @Inject('UsuarioPermisosRepository')
    private readonly repo: UsuarioPermisosRepository,
  ) {}

  async execute(id: string, submodulos: string[]): Promise<UsuarioPermisos> {
    const existing = await this.repo.obtenerPorId(id);
    if (!existing) throw new NotFoundException(`Asignación con id ${id} no encontrada`);
    return this.repo.actualizarSubmodulos(id, submodulos);
  }
}
