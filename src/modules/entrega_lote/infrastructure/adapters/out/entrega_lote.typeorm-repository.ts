import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntregaLote } from '../../../domain/entities/entrega_lote.entity';
import type { EntregaLoteRepository } from '../../../domain/ports/entrega_lote.repository';
import { EntregaLoteOrmEntity } from '../../entities/entrega_lote.orm-entity';

@Injectable()
export class EntregaLoteTypeOrmRepository implements EntregaLoteRepository {
  constructor(
    @InjectRepository(EntregaLoteOrmEntity)
    private readonly repo: Repository<EntregaLoteOrmEntity>,
  ) {}

  private toEntity(orm: EntregaLoteOrmEntity): EntregaLote {
    return new EntregaLote(orm.id_entrega, orm.id_lote, orm.cantidad_entregada, orm.cantidad_devuelta);
  }

  async crear(entregaLote: EntregaLote): Promise<EntregaLote> {
    const orm = this.repo.create({
      id_entrega: entregaLote.id_entrega,
      id_lote: entregaLote.id_lote,
      cantidad_entregada: entregaLote.cantidad_entregada,
      cantidad_devuelta: entregaLote.cantidad_devuelta,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<EntregaLote[]> {
    const data = await this.repo.find();
    return data.map(orm => this.toEntity(orm));
  }

  async obtenerPorIds(id_entrega: string, id_lote: string): Promise<EntregaLote | null> {
    const orm = await this.repo.findOneBy({ id_entrega, id_lote });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id_entrega: string, id_lote: string, data: Partial<EntregaLote>): Promise<EntregaLote> {
    await this.repo.update({ id_entrega, id_lote }, data as any);
    const orm = await this.repo.findOneBy({ id_entrega, id_lote });
    if (!orm) throw new Error(`EntregaLote con id_entrega ${id_entrega} e id_lote ${id_lote} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id_entrega: string, id_lote: string): Promise<void> {
    await this.repo.delete({ id_entrega, id_lote });
  }
}
