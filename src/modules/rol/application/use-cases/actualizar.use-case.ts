import { Injectable, Inject } from '@nestjs/common';
import { Rol } from '../../domain/entities/rol.entity';
import type { RolRepository } from '../../domain/ports/rol.repository';

@Injectable()
export class ActualizarRolUseCase {
  constructor(
    @Inject('RolRepository')
    private readonly repo: RolRepository,
  ) {}

  async execute(id: string, data: { nombre?: string; descripcion?: string }): Promise<Rol> {
    const mapped: Partial<Rol> = {
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.descripcion && { descripcion: data.descripcion }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
