import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SedeRepository } from '../../../domain/ports/sede.repository';
import { Sede } from '../../../domain/entities/sede.entity';
import { SedeOrmEntity } from '../../entities/sede.orm-entity';

@Injectable()
export class SedeTypeOrmRepository implements SedeRepository {
  constructor(
    @InjectRepository(SedeOrmEntity)
    private readonly repo: Repository<SedeOrmEntity>,
  ) {}

  private toEntity(orm: SedeOrmEntity): Sede {
    return new Sede(
      orm.id_sede,
      orm.id_centro,
      orm.nombre,
      orm.direccion,
      orm.telefono,
      orm.estado,
    );
  }

  async crear(sede: Sede): Promise<Sede> {
    const orm = this.repo.create({
      id_centro: sede.id_centro,
      nombre: sede.nombre,
      direccion: sede.direccion,
      telefono: sede.telefono,
      estado: sede.estado as any,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Sede[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: number): Promise<Sede | null> {
    const orm = await this.repo.findOneBy({ id_sede: id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: number, data: Partial<Sede>): Promise<Sede> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id_sede: id });
    if (!orm) throw new Error(`Sede con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
