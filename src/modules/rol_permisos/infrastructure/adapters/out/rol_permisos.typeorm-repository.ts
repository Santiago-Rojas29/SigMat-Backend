import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolPermisos } from '../../../domain/entities/rol_permisos.entity';
import type { RolPermisosRepository } from '../../../domain/ports/rol_permisos.repository';
import { RolPermisosOrmEntity } from '../../entities/rol_permisos.orm-entity';

@Injectable()
export class RolPermisosTypeOrmRepository implements RolPermisosRepository {
  constructor(
    @InjectRepository(RolPermisosOrmEntity)
    private readonly repo: Repository<RolPermisosOrmEntity>,
  ) {}

  private toEntity(orm: RolPermisosOrmEntity): RolPermisos {
    return new RolPermisos(
      orm.id,
      orm.id_rol,
      orm.id_permiso,
      orm.submodulos ?? [],
      orm.acciones   ?? [],
    );
  }

  async asignar(entity: RolPermisos): Promise<RolPermisos> {
    const orm = this.repo.create({
      id_rol:     entity.id_rol,
      id_permiso: entity.id_permiso,
      submodulos: entity.submodulos,
      acciones:   entity.acciones,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<RolPermisos[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorRol(id_rol: string): Promise<RolPermisos[]> {
    const data = await this.repo.find({ where: { id_rol } });
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<RolPermisos | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: string, submodulos: string[], acciones: string[]): Promise<RolPermisos> {
    await this.repo.update(id, { submodulos, acciones });
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Asignación con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
