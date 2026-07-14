import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioPermisos } from '../../../domain/entities/usuario_permisos.entity';
import type { UsuarioPermisosRepository } from '../../../domain/ports/usuario_permisos.repository';
import { UsuarioPermisosOrmEntity } from '../../entities/usuario_permisos.orm-entity';

@Injectable()
export class UsuarioPermisosTypeOrmRepository implements UsuarioPermisosRepository {
  constructor(
    @InjectRepository(UsuarioPermisosOrmEntity)
    private readonly repo: Repository<UsuarioPermisosOrmEntity>,
  ) {}

  private toEntity(orm: UsuarioPermisosOrmEntity): UsuarioPermisos {
    return new UsuarioPermisos(orm.id, orm.id_usuario, orm.id_permiso, orm.submodulos ?? []);
  }

  async asignar(entity: UsuarioPermisos): Promise<UsuarioPermisos> {
    const orm = this.repo.create({
      id_usuario: entity.id_usuario,
      id_permiso: entity.id_permiso,
      submodulos: entity.submodulos,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerPorUsuario(id_usuario: string): Promise<UsuarioPermisos[]> {
    const data = await this.repo.find({ where: { id_usuario } });
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<UsuarioPermisos | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizarSubmodulos(id: string, submodulos: string[]): Promise<UsuarioPermisos> {
    await this.repo.update(id, { submodulos });
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Asignación con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async revocar(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async revocarTodosPorUsuario(id_usuario: string): Promise<void> {
    await this.repo.delete({ id_usuario });
  }
}
