import { Injectable, Inject } from '@nestjs/common';
import { Permisos, ModuloPermiso } from '../../domain/entities/permisos.entity';
import type { PermisosRepository } from '../../domain/ports/permisos.repository';

@Injectable()
export class CrearPermisosUseCase {
  constructor(
    @Inject('PermisosRepository')
    private readonly repo: PermisosRepository,
  ) {}

  async execute(data: { nombre: string; descripcion: string; modulo: ModuloPermiso; submodulos?: string[] }): Promise<Permisos> {
    const entity = new Permisos('', data.nombre, data.descripcion, data.modulo, data.submodulos);
    entity.validar();
    return this.repo.crear(entity);
  }
}
