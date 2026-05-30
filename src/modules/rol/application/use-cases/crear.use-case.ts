import { Injectable, Inject } from '@nestjs/common';
import { Rol } from '../../domain/entities/rol.entity';
import type { RolRepository } from '../../domain/ports/rol.repository';

@Injectable()
export class CrearRolUseCase {
  constructor(
    @Inject('RolRepository')
    private readonly repo: RolRepository,
  ) {}

  async execute(data: { nombre: string; descripcion: string }): Promise<Rol> {
    const entity = new Rol('', data.nombre, data.descripcion);
    entity.validar();
    return this.repo.crear(entity);
  }
}
