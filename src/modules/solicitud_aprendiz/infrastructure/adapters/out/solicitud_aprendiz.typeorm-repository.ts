import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudAprendizRepository } from '../../../domain/ports/solicitud_aprendiz.repository';
import { SolicitudAprendiz } from '../../../domain/entities/solicitud_aprendiz.entity';
import { SolicitudAprendizOrmEntity } from '../../entities/solicitud_aprendiz.orm-entity';

@Injectable()
export class SolicitudAprendizTypeOrmRepository implements SolicitudAprendizRepository {
  constructor(
    @InjectRepository(SolicitudAprendizOrmEntity)
    private readonly repo: Repository<SolicitudAprendizOrmEntity>,
  ) {}

  private toEntity(orm: SolicitudAprendizOrmEntity): SolicitudAprendiz {
    return new SolicitudAprendiz(orm.id_solicitud, orm.id_aprendiz);
  }

  async crear(sa: SolicitudAprendiz): Promise<SolicitudAprendiz> {
    const orm = this.repo.create({ id_solicitud: sa.id_solicitud, id_aprendiz: sa.id_aprendiz });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<SolicitudAprendiz[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id_solicitud: string, id_aprendiz: string): Promise<SolicitudAprendiz | null> {
    const orm = await this.repo.findOneBy({ id_solicitud, id_aprendiz });
    return orm ? this.toEntity(orm) : null;
  }

  async eliminar(id_solicitud: string, id_aprendiz: string): Promise<void> {
    await this.repo.delete({ id_solicitud, id_aprendiz });
  }
}
