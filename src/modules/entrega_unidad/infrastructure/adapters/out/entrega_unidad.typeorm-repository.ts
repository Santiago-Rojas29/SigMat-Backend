import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntregaUnidad } from '../../../domain/entities/entrega_unidad.entity';
import type { EntregaUnidadRepository } from '../../../domain/ports/entrega_unidad.repository';
import { EntregaUnidadOrmEntity } from '../../entities/entrega_unidad.orm-entity';

@Injectable()
export class EntregaUnidadTypeOrmRepository implements EntregaUnidadRepository {
  constructor(
    @InjectRepository(EntregaUnidadOrmEntity)
    private readonly repo: Repository<EntregaUnidadOrmEntity>,
  ) {}

  private toEntity(orm: EntregaUnidadOrmEntity): EntregaUnidad {
    return new EntregaUnidad(orm.id_entrega, orm.id_unidad);
  }

  async crear(entregaUnidad: EntregaUnidad): Promise<EntregaUnidad> {
    const orm = this.repo.create({
      id_entrega: entregaUnidad.id_entrega,
      id_unidad: entregaUnidad.id_unidad,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<EntregaUnidad[]> {
    const data = await this.repo.find();
    return data.map(orm => this.toEntity(orm));
  }

  async obtenerPorIds(id_entrega: string, id_unidad: string): Promise<EntregaUnidad | null> {
    const orm = await this.repo.findOneBy({ id_entrega, id_unidad });
    return orm ? this.toEntity(orm) : null;
  }

  async eliminar(id_entrega: string, id_unidad: string): Promise<void> {
    await this.repo.delete({ id_entrega, id_unidad });
  }
}
