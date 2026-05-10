import { Repository } from 'typeorm';
import { DevolucionRepository } from '../../../domain/ports/devolucion.repository';
import { Devolucion } from '../../../domain/entities/devolucion.entity';
import { DevolucionOrmEntity } from '../../entities/devolucion.orm-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DevolucionTypeOrmRepository implements DevolucionRepository {
  constructor(
    @InjectRepository(DevolucionOrmEntity)
    private readonly repo: Repository<DevolucionOrmEntity>,
  ) {}

  private toEntity(orm: DevolucionOrmEntity): Devolucion {
    return new Devolucion(orm.id, orm.id_entrega, orm.fecha_devolucion, orm.condicion, orm.observaciones);
  }

  async crear(devolucion: Devolucion): Promise<Devolucion> {
    const orm = this.repo.create({
      id_entrega: devolucion.id_entrega,
      fecha_devolucion: devolucion.fecha_devolucion,
      condicion: devolucion.condicion,
      observaciones: devolucion.observaciones,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Devolucion[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorID(id: string): Promise<Devolucion | null> {
    const orm = await this.repo.findOneBy({ id });
    if (!orm) return null;
    return this.toEntity(orm);
  }

  async actualizar(id: string, data: Partial<Devolucion>): Promise<Devolucion> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Devolucion con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
