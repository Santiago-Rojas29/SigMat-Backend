import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidencia } from '../../../domain/entities/incidencia.entity';
import { IncidenciaRepository } from '../../../domain/ports/incidencia.repository';
import { IncidenciaOrmEntity } from '../../entities/incidencia.orm-entity';
import { TenantService } from 'src/common/tenant/tenant.service';

@Injectable()
export class IncidenciaTypeOrmRepository implements IncidenciaRepository {
  constructor(
    @InjectRepository(IncidenciaOrmEntity)
    private readonly repo: Repository<IncidenciaOrmEntity>,
    private readonly tenant: TenantService,
  ) {}

  private toEntity(orm: IncidenciaOrmEntity): Incidencia {
    return new Incidencia(
      orm.id,
      orm.id_unidad,
      orm.id_usuario,
      orm.tipo,
      orm.fecha_incidencia,
      orm.descripcion,
      orm.estado,
    );
  }

  async crear(entity: Incidencia): Promise<Incidencia> {
    const orm = this.repo.create({
      id_sede: this.tenant.tenantId,
      id_unidad: entity.id_unidad,
      id_usuario: entity.id_usuario,
      tipo: entity.tipo,
      fecha_incidencia: entity.fecha_incidencia,
      descripcion: entity.descripcion,
      estado: entity.estado,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Incidencia[]> {
    const where = this.tenant.isRoot ? {} : { id_sede: this.tenant.tenantId! };
    const data = await this.repo.find({ where });
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Incidencia | null> {
    const orm = await this.repo.findOneBy({ id });
    if (!orm) return null;
    return this.toEntity(orm);
  }

  async actualizar(id: string, data: Partial<Incidencia>): Promise<Incidencia> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Incidencia con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
