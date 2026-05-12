import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnidadRepository } from '../../../domain/ports/unidad.repository';
import { Unidad } from '../../../domain/entities/unidad.entity';
import { UnidadOrmEntity } from '../../entities/unidad.orm-entity';

@Injectable()
export class UnidadTypeOrmRepository implements UnidadRepository {
  constructor(
    @InjectRepository(UnidadOrmEntity)
    private readonly repo: Repository<UnidadOrmEntity>,
  ) {}

  private toEntity(orm: UnidadOrmEntity): Unidad {
    return new Unidad(
      orm.id_unidad,
      orm.id_material,
      orm.id_responsable,
      orm.id_ubicacion,
      orm.codigo_unidad,
      orm.estado,
    );
  }

  async crear(unidad: Unidad): Promise<Unidad> {
    const orm = this.repo.create({
      id_material: unidad.id_material,
      id_responsable: unidad.id_responsable,
      id_ubicacion: unidad.id_ubicacion,
      codigo_unidad: unidad.codigo_unidad,
      estado: unidad.estado as any,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Unidad[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: number): Promise<Unidad | null> {
    const orm = await this.repo.findOneBy({ id_unidad: id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: number, data: Partial<Unidad>): Promise<Unidad> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id_unidad: id });
    if (!orm) throw new Error(`Unidad con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
