import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CentroRepository } from '../../../domain/ports/centro.repository';
import { Centro } from '../../../domain/entities/centro.entity';
import { CentroOrmEntity } from '../../entities/centro.orm-entity';

@Injectable()
export class CentroTypeOrmRepository implements CentroRepository {
  constructor(
    @InjectRepository(CentroOrmEntity)
    private readonly repo: Repository<CentroOrmEntity>,
  ) {}

  private toEntity(orm: CentroOrmEntity): Centro {
    return new Centro(
      orm.id,
      orm.nombre,
      orm.ciudad,
      orm.direccion,
      orm.telefono,
      orm.estado,
    );
  }

  async crear(entity: Centro): Promise<Centro> {
    const orm = this.repo.create({
      nombre: entity.nombre,
      ciudad: entity.ciudad,
      direccion: entity.direccion,
      telefono: entity.telefono,
      estado: entity.estado as any,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Centro[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Centro | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: string, data: Partial<Centro>): Promise<Centro> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Centro con id ${id} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
