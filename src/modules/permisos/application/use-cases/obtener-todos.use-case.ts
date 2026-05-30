import { Injectable, Inject } from '@nestjs/common';
import { Permisos } from '../../domain/entities/permisos.entity';
import type { PermisosRepository } from '../../domain/ports/permisos.repository';

@Injectable()
export class ObtenerTodosPermisosUseCase {
  constructor(
    @Inject('PermisosRepository')
    private readonly repo: PermisosRepository,
  ) {}

  async execute(): Promise<Permisos[]> {
    return this.repo.obtenerTodos();
  }
}
