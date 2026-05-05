import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Validacion } from '../../../domain/entities/validacion.entity';
import type { ValidacionRepository } from '../../../domain/ports/validacion.repository';
import { ValidacionOrmEntity } from '../../entities/validacion.orm-entity';

@Injectable()
export class ValidacionTypeOrmRepository implements ValidacionRepository {
  constructor(
    @InjectRepository(ValidacionOrmEntity)
    private readonly repo: Repository<ValidacionOrmEntity>,
  ) {}

  private toEntity(orm: ValidacionOrmEntity): Validacion {
    return new Validacion(orm.id, orm.id_solicitud, orm.id_validador, orm.fecha_validacion, orm.decision, orm.observaciones);
  }

  async crear(validacion: Validacion): Promise<Validacion> {
    const orm = this.repo.create({
      id_solicitud: validacion.id_solicitud,
      id_validador: validacion.id_validador,
      fecha_validacion: validacion.fecha_validacion,
      decision: validacion.decision as any,
      observaciones: validacion.observaciones,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Validacion[]> {
    const data = await this.repo.find();
    return data.map(orm => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Validacion | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: string, data: Partial<Validacion>): Promise<Validacion> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Validacion con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
