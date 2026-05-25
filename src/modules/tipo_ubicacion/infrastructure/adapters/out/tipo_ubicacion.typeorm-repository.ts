import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoUbicacionRepository } from '../../../domain/ports/tipo_ubicacion.repository';
import { TipoUbicacion } from '../../../domain/entities/tipo_ubicacion.entity';
import { TipoUbicacionOrmEntity } from '../../entities/tipo_ubicacion.orm-entity';

@Injectable()
export class TipoUbicacionTypeOrmRepository implements TipoUbicacionRepository {
  constructor(
    @InjectRepository(TipoUbicacionOrmEntity)
    private readonly repo: Repository<TipoUbicacionOrmEntity>,
  ) {}

  private toEntity(orm: TipoUbicacionOrmEntity): TipoUbicacion {
    return new TipoUbicacion(
      orm.id_tipo_ubicacion,
      orm.nombre,
      orm.descripcion,
    );
  }

  async crear(tipoUbicacion: TipoUbicacion): Promise<TipoUbicacion> {
    const orm = this.repo.create({
      nombre: tipoUbicacion.nombre as any,
      descripcion: tipoUbicacion.descripcion,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<TipoUbicacion[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<TipoUbicacion | null> {
    const orm = await this.repo.findOneBy({ id_tipo_ubicacion: id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: string, data: Partial<TipoUbicacion>): Promise<TipoUbicacion> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id_tipo_ubicacion: id });
    if (!orm) throw new Error(`TipoUbicacion con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
