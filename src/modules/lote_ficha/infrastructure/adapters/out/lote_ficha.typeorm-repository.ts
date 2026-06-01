import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoteFichaRepository } from '../../../domain/ports/lote_ficha.repository';
import { LoteFicha } from '../../../domain/entities/lote_ficha.entity';
import { LoteFichaOrmEntity } from '../../entities/lote_ficha.orm-entity';

@Injectable()
export class LoteFichaTypeOrmRepository implements LoteFichaRepository {
  constructor(
    @InjectRepository(LoteFichaOrmEntity)
    private readonly repo: Repository<LoteFichaOrmEntity>,
  ) {}

  private toEntity(orm: LoteFichaOrmEntity): LoteFicha {
    return new LoteFicha(orm.id, orm.id_lote, orm.id_ficha, orm.cantidad);
  }

  async crear(lf: LoteFicha): Promise<LoteFicha> {
    const orm = this.repo.create({ id_lote: lf.id_lote, id_ficha: lf.id_ficha, cantidad: lf.cantidad });
    return this.toEntity(await this.repo.save(orm));
  }

  async obtenerTodos(): Promise<LoteFicha[]> {
    return (await this.repo.find()).map(this.toEntity.bind(this));
  }

  async obtenerPorLote(id_lote: string): Promise<LoteFicha[]> {
    return (await this.repo.findBy({ id_lote })).map(this.toEntity.bind(this));
  }

  async obtenerPorId(id: string): Promise<LoteFicha | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: string, data: Partial<LoteFicha>): Promise<LoteFicha> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`LoteFicha con id ${id} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
