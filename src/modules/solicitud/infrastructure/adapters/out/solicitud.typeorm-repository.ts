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
      orm.id_solicitante,
      orm.tipo_flujo,
      orm.tipo_prestamo,
      orm.estado,
      orm.id_instructor,
      orm.id_admin,
      orm.id_bodega,
      orm.observaciones,
      orm.motivo_rechazo,
      orm.fecha_solicitud,
      orm.fecha_respuesta_instructor,
      orm.fecha_respuesta_admin,
      orm.fecha_respuesta_bodega,
      orm.fecha_entrega,
    );
  }

  async crear(solicitud: Solicitud): Promise<Solicitud> {
    const orm = this.repo.create({
      id_solicitante:    solicitud.id_solicitante,
      tipo_flujo:        solicitud.tipo_flujo,
      tipo_prestamo:     solicitud.tipo_prestamo,
      estado:            solicitud.estado,
      id_instructor:     solicitud.id_instructor,
      id_admin:          solicitud.id_admin,
      id_bodega:         solicitud.id_bodega,
      observaciones:     solicitud.observaciones,
      motivo_rechazo:    solicitud.motivo_rechazo,
      fecha_solicitud:   solicitud.fecha_solicitud,
      fecha_respuesta_instructor: solicitud.fecha_respuesta_instructor,
      fecha_respuesta_admin:      solicitud.fecha_respuesta_admin,
      fecha_respuesta_bodega:     solicitud.fecha_respuesta_bodega,
      fecha_entrega:              solicitud.fecha_entrega,
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
