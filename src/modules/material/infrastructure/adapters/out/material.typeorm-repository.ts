import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../../../domain/entities/material.entity';
import { MaterialRepository } from '../../../domain/ports/material.repository';
import { MaterialOrmEntity } from '../../entities/material.orm-entity';

@Injectable()
export class MaterialTypeOrmRepository implements MaterialRepository {
  constructor(
    @InjectRepository(MaterialOrmEntity)
    private readonly repo: Repository<MaterialOrmEntity>,
  ) {}

  private toEntity(orm: MaterialOrmEntity): Material {
    return new Material(
      orm.id,
      orm.id_ficha,
      orm.nombre,
      orm.categoria,
      orm.tipo,
      orm.marca,
      orm.modelo,
      orm.descripcion,
      orm.codigo_unspsc,
      orm.unidad_medida ?? undefined,
      orm.fecha_vencimiento ?? undefined,
    );
  }

  async crear(entity: Material): Promise<Material> {
    const orm = this.repo.create({
      id_ficha:          entity.id_ficha,
      nombre:            entity.nombre,
      categoria:         entity.categoria,
      tipo:              entity.tipo,
      marca:             entity.marca,
      modelo:            entity.modelo,
      descripcion:       entity.descripcion,
      codigo_unspsc:     entity.codigo_unspsc,
      unidad_medida:     entity.unidad_medida ?? null,
      fecha_vencimiento: entity.fecha_vencimiento ?? null,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Material[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Material | null> {
    const orm = await this.repo.findOneBy({ id });
    if (!orm) return null;
    return this.toEntity(orm);
  }

  async actualizar(id: string, data: Partial<Material>): Promise<Material> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Material con id ${id} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
