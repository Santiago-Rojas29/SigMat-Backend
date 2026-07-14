import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevolucionUnidad } from '../../../domain/entities/devolucion_unidad.entity';
import { DevolucionUnidadRepository } from '../../../domain/ports/devolucion_unidad.repository';
import { DevolucionUnidadOrmEntity } from '../../entities/devolucion_unidad.orm-entity';

@Injectable()
export class DevolucionUnidadTypeOrmRepository implements DevolucionUnidadRepository {
  constructor(
    @InjectRepository(DevolucionUnidadOrmEntity)
    private readonly repo: Repository<DevolucionUnidadOrmEntity>,
  ) {}

  private toEntity(orm: DevolucionUnidadOrmEntity): DevolucionUnidad {
    return new DevolucionUnidad(orm.id_devolucion, orm.id_unidad, orm.condicion_devolucion);
  }

  async crear(entity: DevolucionUnidad): Promise<DevolucionUnidad> {
    const orm = this.repo.create({
      id_devolucion: entity.id_devolucion,
      id_unidad: entity.id_unidad,
      condicion_devolucion: entity.condicion_devolucion,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<DevolucionUnidad[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorIds(id_devolucion: string, id_unidad: string): Promise<DevolucionUnidad | null> {
    const orm = await this.repo.findOneBy({ id_devolucion, id_unidad });
    if (!orm) return null;
    return this.toEntity(orm);
  }
}
