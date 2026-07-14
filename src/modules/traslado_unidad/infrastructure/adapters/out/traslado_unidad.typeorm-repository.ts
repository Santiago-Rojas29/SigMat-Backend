import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrasladoUnidad } from '../../../domain/entities/traslado_unidad.entity';
import { TrasladoUnidadRepository } from '../../../domain/ports/traslado_unidad.repository';
import { TrasladoUnidadOrmEntity } from '../../entities/traslado_unidad.orm-entity';

@Injectable()
export class TrasladoUnidadTypeOrmRepository implements TrasladoUnidadRepository {
  constructor(
    @InjectRepository(TrasladoUnidadOrmEntity)
    private readonly repo: Repository<TrasladoUnidadOrmEntity>,
  ) {}

  private toEntity(orm: TrasladoUnidadOrmEntity): TrasladoUnidad {
    return new TrasladoUnidad(orm.id_traslado, orm.id_unidad);
  }

  async crear(entity: TrasladoUnidad): Promise<TrasladoUnidad> {
    const orm = this.repo.create({
      id_traslado: entity.id_traslado,
      id_unidad: entity.id_unidad,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<TrasladoUnidad[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorIds(id_traslado: string, id_unidad: string): Promise<TrasladoUnidad | null> {
    const orm = await this.repo.findOneBy({ id_traslado, id_unidad });
    if (!orm) return null;
    return this.toEntity(orm);
  }
}
