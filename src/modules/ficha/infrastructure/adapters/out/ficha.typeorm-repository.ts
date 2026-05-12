import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichaRepository } from '../../../domain/ports/ficha.repository';
import { Ficha } from '../../../domain/entities/ficha.entity';
import { FichaOrmEntity } from '../../entities/ficha.orm-entity';

@Injectable()
export class FichaTypeOrmRepository implements FichaRepository {
  constructor(
    @InjectRepository(FichaOrmEntity)
    private readonly repo: Repository<FichaOrmEntity>,
  ) {}

  private toEntity(orm: FichaOrmEntity): Ficha {
    return new Ficha(
      orm.id_ficha,
      orm.id_programa,
      orm.codigo_ficha,
      orm.fecha_inicio,
      orm.fecha_fin,
      orm.jornada,
      orm.estado,
    );
  }

  async crear(ficha: Ficha): Promise<Ficha> {
    const orm = this.repo.create({
      id_programa: ficha.id_programa,
      codigo_ficha: ficha.codigo_ficha,
      fecha_inicio: ficha.fecha_inicio,
      fecha_fin: ficha.fecha_fin,
      jornada: ficha.jornada as any,
      estado: ficha.estado as any,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Ficha[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: number): Promise<Ficha | null> {
    const orm = await this.repo.findOneBy({ id_ficha: id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: number, data: Partial<Ficha>): Promise<Ficha> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id_ficha: id });
    if (!orm) throw new Error(`Ficha con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
