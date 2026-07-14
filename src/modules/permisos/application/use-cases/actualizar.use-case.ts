import { Injectable, Inject } from '@nestjs/common';
import { Permisos, ModuloPermiso } from '../../domain/entities/permisos.entity';
import type { PermisosRepository } from '../../domain/ports/permisos.repository';

@Injectable()
export class ActualizarPermisosUseCase {
  constructor(
    @Inject('PermisosRepository')
    private readonly repo: PermisosRepository,
  ) {}

  async execute(
    id: string,
    data: { nombre?: string; descripcion?: string; modulo?: ModuloPermiso; submodulos?: string[] },
  ): Promise<Permisos> {
    const mapped: Partial<Permisos> = {
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.descripcion && { descripcion: data.descripcion }),
      ...(data.modulo && { modulo: data.modulo }),
      ...('submodulos' in data && { submodulos: data.submodulos ?? [] }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
