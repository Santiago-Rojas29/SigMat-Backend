import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permisos } from '../../../domain/entities/permisos.entity';
import { PermisosRepository } from '../../../domain/ports/permisos.repository';
import { PermisosOrmEntity } from '../../entities/permisos.orm-entity';

@Injectable()
export class PermisosTypeOrmRepository implements PermisosRepository {
  constructor(
    @InjectRepository(PermisosOrmEntity)
    private readonly repo: Repository<PermisosOrmEntity>,
  ) {}

  private toEntity(orm: PermisosOrmEntity): Permisos {
    return new Permisos(orm.id, orm.nombre, orm.descripcion, orm.modulo);
  }

  async crear(entity: Permisos): Promise<Permisos> {
    const orm = this.repo.create({
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      modulo: entity.modulo,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Permisos[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Permisos | null> {
    const orm = await this.repo.findOneBy({ id });
    if (!orm) return null;
    return this.toEntity(orm);
  }

  async actualizar(id: string, data: Partial<Permisos>): Promise<Permisos> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Permiso con id ${id} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
