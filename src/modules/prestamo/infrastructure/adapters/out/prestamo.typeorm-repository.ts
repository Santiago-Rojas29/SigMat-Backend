import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrestamoRepository } from '../../../domain/ports/prestamo.repository';
import { Prestamo } from '../../../domain/entities/prestamo.entity';
import { PrestamoOrmEntity } from '../../entities/prestamo.orm-entity';

@Injectable()
export class PrestamoTypeOrmRepository implements PrestamoRepository {
  constructor(
    @InjectRepository(PrestamoOrmEntity)
    private readonly repo: Repository<PrestamoOrmEntity>,
  ) {}

  private toEntity(orm: PrestamoOrmEntity): Prestamo {
    return new Prestamo(orm.id, orm.id_validacion, orm.fecha_limite, orm.estado);
  }

  async crear(prestamo: Prestamo): Promise<Prestamo> {
    const orm = this.repo.create({
      id_validacion: prestamo.id_validacion,
      fecha_limite: prestamo.fecha_limite,
      estado: prestamo.estado as any,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Prestamo[]> {
    const data = await this.repo.find();
    return data.map(orm => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Prestamo | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: string, data: Partial<Prestamo>): Promise<Prestamo> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Prestamo con id ${id} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
