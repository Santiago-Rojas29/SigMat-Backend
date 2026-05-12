import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudLoteRepository } from '../../../domain/ports/solicitud_lote.repository';
import { SolicitudLote } from '../../../domain/entities/solicitud_lote.entity';
import { SolicitudLoteOrmEntity } from '../../entities/solicitud_lote.orm-entity';

@Injectable()
export class SolicitudLoteTypeOrmRepository implements SolicitudLoteRepository {
  constructor(
    @InjectRepository(SolicitudLoteOrmEntity)
    private readonly repo: Repository<SolicitudLoteOrmEntity>,
  ) {}

  private toEntity(orm: SolicitudLoteOrmEntity): SolicitudLote {
    return new SolicitudLote(
      orm.id_solicitud,
      orm.id_lote,
      orm.cantidad_solicitada,
      orm.id_usuario,
    );
  }

  async crear(solicitudLote: SolicitudLote): Promise<SolicitudLote> {
    const orm = this.repo.create({
      id_solicitud: solicitudLote.id_solicitud,
      id_lote: solicitudLote.id_lote,
      cantidad_solicitada: solicitudLote.cantidad_solicitada,
      id_usuario: solicitudLote.id_usuario,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<SolicitudLote[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id_solicitud: number, id_lote: number): Promise<SolicitudLote | null> {
    const orm = await this.repo.findOneBy({ id_solicitud, id_lote });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id_solicitud: number, id_lote: number, data: Partial<SolicitudLote>): Promise<SolicitudLote> {
    await this.repo.update({ id_solicitud, id_lote }, data as any);
    const orm = await this.repo.findOneBy({ id_solicitud, id_lote });
    if (!orm) throw new Error(`SolicitudLote con id_solicitud ${id_solicitud} e id_lote ${id_lote} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id_solicitud: number, id_lote: number): Promise<void> {
    await this.repo.delete({ id_solicitud, id_lote });
  }
}
