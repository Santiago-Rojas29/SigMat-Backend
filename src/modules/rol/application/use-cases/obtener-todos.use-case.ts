import { Injectable, Inject } from '@nestjs/common';
import { Rol } from '../../domain/entities/rol.entity';
import type { RolRepository } from '../../domain/ports/rol.repository';

@Injectable()
export class ObtenerTodosRolUseCase {
  constructor(
    @Inject('RolRepository')
    private readonly repo: RolRepository,
  ) {}

  async execute(): Promise<Rol[]> {
    return this.repo.obtenerTodos();
  }
}
