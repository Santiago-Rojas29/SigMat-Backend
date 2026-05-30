import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaRepository } from '../../../domain/ports/area.repository';
import { Area } from '../../../domain/entities/area.entity';
import { AreaOrmEntity } from '../../entities/area.orm-entity';

@Injectable()
export class AreaTypeOrmRepository implements AreaRepository {
  constructor(
    @InjectRepository(AreaOrmEntity)
    private readonly repo: Repository<AreaOrmEntity>,
  ) { }

  private toEntity(orm: AreaOrmEntity): Area {
    return new Area(
      orm.id_area,
      orm.id_sede,
      orm.id_usuario,
      orm.nombre,
      orm.descripcion,
      orm.estado,
    );
  }

  async crear(area: Area): Promise<Area> {
    const orm = this.repo.create({
      id_sede: area.id_sede,
      id_usuario: area.id_usuario,
      nombre: area.nombre,
      descripcion: area.descripcion,
      estado: area.estado as any,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Area[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Area | null> {
    const orm = await this.repo.findOneBy({ id_area: id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: string, data: Partial<Area>): Promise<Area> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id_area: id });
    if (!orm) throw new Error(`Area con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
