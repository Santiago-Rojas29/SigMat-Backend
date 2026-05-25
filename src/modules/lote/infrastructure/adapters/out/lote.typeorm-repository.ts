import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoteRepository } from '../../../domain/ports/lote.repository';
import { Lote } from '../../../domain/entities/lote.entity';
import { LoteOrmEntity } from '../../entities/lote.orm-entity';

@Injectable()
export class LoteTypeOrmRepository implements LoteRepository {
  constructor(
    @InjectRepository(LoteOrmEntity)
    private readonly repo: Repository<LoteOrmEntity>,
  ) {}

  private toEntity(orm: LoteOrmEntity): Lote {
    return new Lote(
      orm.id_lote,
      orm.id_material,
      orm.id_responsable,
      orm.id_ubicacion,
      orm.codigo_lote,
      orm.cantidad_inicial,
      orm.cantidad_disponible,
      orm.unidad_medida,
      orm.fecha_entrada,
    );
  }

  async crear(lote: Lote): Promise<Lote> {
    const orm = this.repo.create({
      id_material: lote.id_material,
      id_responsable: lote.id_responsable,
      id_ubicacion: lote.id_ubicacion,
      codigo_lote: lote.codigo_lote,
      cantidad_inicial: lote.cantidad_inicial,
      cantidad_disponible: lote.cantidad_disponible,
      unidad_medida: lote.unidad_medida as any,
      fecha_entrada: lote.fecha_entrada,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Lote[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Lote | null> {
    const orm = await this.repo.findOneBy({ id_lote: id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: string, data: Partial<Lote>): Promise<Lote> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id_lote: id });
    if (!orm) throw new Error(`Lote con id ${id} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
