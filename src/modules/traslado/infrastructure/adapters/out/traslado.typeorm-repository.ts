import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Traslado } from '../../../domain/entities/traslado.entity';
import { TrasladoRepository } from '../../../domain/ports/traslado.repository';
import { TrasladoOrmEntity } from '../../entities/traslado.orm-entity';

@Injectable()
export class TrasladoTypeOrmRepository implements TrasladoRepository {
  constructor(
    @InjectRepository(TrasladoOrmEntity)
    private readonly repo: Repository<TrasladoOrmEntity>,
  ) {}

  private toEntity(orm: TrasladoOrmEntity): Traslado {
    return new Traslado(
      orm.id,
      orm.id_responsable,
      orm.id_ubicacion_origen,
      orm.id_ubicacion_destino,
      orm.fecha_traslado,
      orm.motivo,
      orm.observaciones,
    );
  }

  async crear(entity: Traslado): Promise<Traslado> {
    const orm = this.repo.create({
      id_responsable: entity.id_responsable,
      id_ubicacion_origen: entity.id_ubicacion_origen,
      id_ubicacion_destino: entity.id_ubicacion_destino,
      fecha_traslado: entity.fecha_traslado,
      motivo: entity.motivo,
      observaciones: entity.observaciones,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Traslado[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Traslado | null> {
    const orm = await this.repo.findOneBy({ id });
    if (!orm) return null;
    return this.toEntity(orm);
  }

  async actualizar(id: string, data: Partial<Traslado>): Promise<Traslado> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Traslado con id ${id} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
