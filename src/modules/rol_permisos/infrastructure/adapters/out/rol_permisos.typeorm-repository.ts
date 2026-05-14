import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolPermisos } from '../../../domain/entities/rol_permisos.entity';
import { RolPermisosRepository } from '../../../domain/ports/rol_permisos.repository';
import { RolPermisosOrmEntity } from '../../entities/rol_permisos.orm-entity';

@Injectable()
export class RolPermisosTypeOrmRepository implements RolPermisosRepository {
  constructor(
    @InjectRepository(RolPermisosOrmEntity)
    private readonly repo: Repository<RolPermisosOrmEntity>,
  ) {}

  private toEntity(orm: RolPermisosOrmEntity): RolPermisos {
    return new RolPermisos(orm.id_rol, orm.id_permiso);
  }

  async crear(entity: RolPermisos): Promise<RolPermisos> {
    const orm = this.repo.create({
      id_rol: entity.id_rol,
      id_permiso: entity.id_permiso,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<RolPermisos[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorIds(id_rol: string, id_permiso: string): Promise<RolPermisos | null> {
    const orm = await this.repo.findOneBy({ id_rol, id_permiso });
    if (!orm) return null;
    return this.toEntity(orm);
  }
}
