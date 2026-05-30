import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudRepository } from '../../../domain/ports/solicitud.repository';
import { Solicitud } from '../../../domain/entities/solicitud.entity';
import { SolicitudOrmEntity } from '../../entities/solicitud.orm-entity';

@Injectable()
export class SolicitudTypeOrmRepository implements SolicitudRepository {
  constructor(
    @InjectRepository(SolicitudOrmEntity)
    private readonly repo: Repository<SolicitudOrmEntity>,
  ) {}

  private toEntity(orm: SolicitudOrmEntity): Solicitud {
    return new Solicitud(
      orm.id_solicitud,
      orm.id_ficha,
      orm.id_solicitante,
      orm.fecha_solicitud,
      orm.tipo_prestamo,
      orm.estado,
      orm.observaciones,
    );
  }

  async crear(solicitud: Solicitud): Promise<Solicitud> {
    const orm = this.repo.create({
      id_ficha: solicitud.id_ficha,
      id_solicitante: solicitud.id_solicitante,
      fecha_solicitud: solicitud.fecha_solicitud,
      tipo_prestamo: solicitud.tipo_prestamo as any,
      estado: solicitud.estado as any,
      observaciones: solicitud.observaciones,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Solicitud[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Solicitud | null> {
    const orm = await this.repo.findOneBy({ id_solicitud: id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: string, data: Partial<Solicitud>): Promise<Solicitud> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id_solicitud: id });
    if (!orm) throw new Error(`Solicitud con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
