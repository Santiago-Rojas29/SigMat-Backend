import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrasladoLote } from '../../../domain/entities/traslado_lote.entity';
import { TrasladoLoteRepository } from '../../../domain/ports/traslado_lote.repository';
import { TrasladoLoteOrmEntity } from '../../entities/traslado_lote.orm-entity';

@Injectable()
export class TrasladoLoteTypeOrmRepository implements TrasladoLoteRepository {
  constructor(
    @InjectRepository(TrasladoLoteOrmEntity)
    private readonly repo: Repository<TrasladoLoteOrmEntity>,
  ) {}

  private toEntity(orm: TrasladoLoteOrmEntity): TrasladoLote {
    return new TrasladoLote(orm.id_traslado, orm.id_lote, orm.cantidad_trasladada);
  }

  async crear(entity: TrasladoLote): Promise<TrasladoLote> {
    const orm = this.repo.create({
      id_traslado: entity.id_traslado,
      id_lote: entity.id_lote,
      cantidad_trasladada: entity.cantidad_trasladada,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<TrasladoLote[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorIds(id_traslado: string, id_lote: string): Promise<TrasladoLote | null> {
    const orm = await this.repo.findOneBy({ id_traslado, id_lote });
    if (!orm) return null;
    return this.toEntity(orm);
  }
}
