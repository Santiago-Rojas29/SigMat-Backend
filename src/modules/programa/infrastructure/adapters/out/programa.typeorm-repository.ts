import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramaRepository } from '../../../domain/ports/programa.repository';
import { Programa } from '../../../domain/entities/programa.entity';
import { ProgramaOrmEntity } from '../../entities/programa.orm-entity';

@Injectable()
export class ProgramaTypeOrmRepository implements ProgramaRepository {
  constructor(
    @InjectRepository(ProgramaOrmEntity)
    private readonly repo: Repository<ProgramaOrmEntity>,
  ) { }

  private toEntity(orm: ProgramaOrmEntity): Programa {
    return new Programa(
      orm.id_programa,
      orm.id_area,
      orm.nombre,
      orm.codigo_programa,
      orm.nivel_formacion,
      orm.estado,
    );
  }

  async crear(programa: Programa): Promise<Programa> {
    const orm = this.repo.create({
      id_area: programa.id_area,
      nombre: programa.nombre,
      codigo_programa: programa.codigo_programa,
      nivel_formacion: programa.nivel_formacion as any,
      estado: programa.estado as any,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Programa[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Programa | null> {
    const orm = await this.repo.findOneBy({ id_programa: id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: string, data: Partial<Programa>): Promise<Programa> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id_programa: id });
    if (!orm) throw new Error(`Programa con id ${id} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
