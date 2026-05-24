import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../../../domain/entities/rol.entity';
import { RolRepository } from '../../../domain/ports/rol.repository';
import { RolOrmEntity } from '../../entities/rol.orm-entity';

@Injectable()
export class RolTypeOrmRepository implements RolRepository {
  constructor(
    @InjectRepository(RolOrmEntity)
    private readonly repo: Repository<RolOrmEntity>,
  ) {}

  private toEntity(orm: RolOrmEntity): Rol {
    return new Rol(orm.id, orm.nombre, orm.descripcion);
  }

  async crear(entity: Rol): Promise<Rol> {
    const orm = this.repo.create({
      nombre: entity.nombre,
      descripcion: entity.descripcion,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Rol[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Rol | null> {
    const orm = await this.repo.findOneBy({ id });
    if (!orm) return null;
    return this.toEntity(orm);
  }

  async actualizar(id: string, data: Partial<Rol>): Promise<Rol> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Rol con id ${id} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
