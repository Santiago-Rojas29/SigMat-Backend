import { Injectable, Inject } from '@nestjs/common';
import { Rol } from '../../domain/entities/rol.entity';
import type { RolRepository } from '../../domain/ports/rol.repository';

@Injectable()
export class ObtenerPorIdRolUseCase {
  constructor(
    @Inject('RolRepository')
    private readonly repo: RolRepository,
  ) {}

  async execute(id: string): Promise<Rol | null> {
    return this.repo.obtenerPorId(id);
  }
}
