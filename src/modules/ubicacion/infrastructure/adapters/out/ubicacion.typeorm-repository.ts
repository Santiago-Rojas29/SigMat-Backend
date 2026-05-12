import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UbicacionRepository } from '../../../domain/ports/ubicacion.repository';
import { Ubicacion } from '../../../domain/entities/ubicacion.entity';
import { UbicacionOrmEntity } from '../../entities/ubicacion.orm-entity';

@Injectable()
export class UbicacionTypeOrmRepository implements UbicacionRepository {
  constructor(
    @InjectRepository(UbicacionOrmEntity)
    private readonly repo: Repository<UbicacionOrmEntity>,
  ) {}

  private toEntity(orm: UbicacionOrmEntity): Ubicacion {
    return new Ubicacion(
      orm.id_ubicacion,
      orm.id_area,
      orm.id_tipo_ubicacion,
      orm.nombre,
      orm.descripcion,
      orm.estado,
    );
  }

  async crear(ubicacion: Ubicacion): Promise<Ubicacion> {
    const orm = this.repo.create({
      id_area: ubicacion.id_area,
      id_tipo_ubicacion: ubicacion.id_tipo_ubicacion,
      nombre: ubicacion.nombre,
      descripcion: ubicacion.descripcion,
      estado: ubicacion.estado as any,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Ubicacion[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: number): Promise<Ubicacion | null> {
    const orm = await this.repo.findOneBy({ id_ubicacion: id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: number, data: Partial<Ubicacion>): Promise<Ubicacion> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id_ubicacion: id });
    if (!orm) throw new Error(`Ubicacion con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
