import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntregaRepository } from '../../../domain/ports/entrega.repository';
import { Entrega } from '../../../domain/entities/entrega.entity';
import { EntregaOrmEntity } from '../../entities/entrega.orm-entity';

@Injectable()
export class EntregaTypeOrmRepository implements EntregaRepository {
  constructor(
    @InjectRepository(EntregaOrmEntity)
    private readonly repo: Repository<EntregaOrmEntity>,
  ) {}

  private toEntity(orm: EntregaOrmEntity): Entrega {
    return new Entrega(
      orm.id_entrega,
      orm.id_prestamo,
      orm.id_encargado,
      orm.fecha_entrega,
      orm.observaciones,
    );
  }

  async crear(entrega: Entrega): Promise<Entrega> {
    const orm = this.repo.create({
      id_prestamo: entrega.id_prestamo,
      id_encargado: entrega.id_encargado,
      fecha_entrega: entrega.fecha_entrega,
      observaciones: entrega.observaciones,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Entrega[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: number): Promise<Entrega | null> {
    const orm = await this.repo.findOneBy({ id_entrega: id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: number, data: Partial<Entrega>): Promise<Entrega> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id_entrega: id });
    if (!orm) throw new Error(`Entrega con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
