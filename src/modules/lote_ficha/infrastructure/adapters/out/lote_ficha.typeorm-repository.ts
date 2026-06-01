import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoteFicha } from '../../../domain/entities/lote_ficha.entity';
import type { LoteFichaRepository } from '../../../domain/ports/lote_ficha.repository';
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

  async crear(entity: LoteFicha): Promise<LoteFicha> {
    const orm = this.repo.create({
      id_lote:  entity.id_lote,
      id_ficha: entity.id_ficha,
      cantidad: entity.cantidad,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<LoteFicha[]> {
    const data = await this.repo.find();
    return data.map(orm => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<LoteFicha | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: string, cantidad: number): Promise<LoteFicha> {
    await this.repo.update(id, { cantidad });
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`LoteFicha con id ${id} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
