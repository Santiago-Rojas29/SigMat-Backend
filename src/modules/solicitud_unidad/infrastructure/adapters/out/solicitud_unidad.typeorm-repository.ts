import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudUnidadRepository } from '../../../domain/ports/solicitud_unidad.repository';
import { SolicitudUnidad } from '../../../domain/entities/solicitud_unidad.entity';
import { SolicitudUnidadOrmEntity } from '../../entities/solicitud_unidad.orm-entity';

@Injectable()
export class SolicitudUnidadTypeOrmRepository implements SolicitudUnidadRepository {
  constructor(
    @InjectRepository(SolicitudUnidadOrmEntity)
    private readonly repo: Repository<SolicitudUnidadOrmEntity>,
  ) {}

  private toEntity(orm: SolicitudUnidadOrmEntity): SolicitudUnidad {
    return new SolicitudUnidad(
      orm.id_solicitud,
      orm.id_unidad,
      orm.id_usuario,
    );
  }

  async crear(solicitudUnidad: SolicitudUnidad): Promise<SolicitudUnidad> {
    const orm = this.repo.create({
      id_solicitud: solicitudUnidad.id_solicitud,
      id_unidad: solicitudUnidad.id_unidad,
      id_usuario: solicitudUnidad.id_usuario,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<SolicitudUnidad[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id_solicitud: string, id_unidad: string): Promise<SolicitudUnidad | null> {
    const orm = await this.repo.findOneBy({ id_solicitud, id_unidad });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id_solicitud: string, id_unidad: string, data: Partial<SolicitudUnidad>): Promise<SolicitudUnidad> {
    await this.repo.update({ id_solicitud, id_unidad }, data as any);
    const orm = await this.repo.findOneBy({ id_solicitud, id_unidad });
    if (!orm) throw new Error(`SolicitudUnidad con id_solicitud ${id_solicitud} e id_unidad ${id_unidad} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id_solicitud: string, id_unidad: string): Promise<void> {
    await this.repo.delete({ id_solicitud, id_unidad });
  }
}
