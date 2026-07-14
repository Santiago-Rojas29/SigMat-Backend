import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntregaRepository } from '../../../domain/ports/entrega.repository';
import { Entrega } from '../../../domain/entities/entrega.entity';
import { EntregaOrmEntity } from '../../entities/entrega.orm-entity';
import { TenantService } from 'src/common/tenant/tenant.service';

@Injectable()
export class EntregaTypeOrmRepository implements EntregaRepository {
  constructor(
    @InjectRepository(EntregaOrmEntity)
    private readonly repo: Repository<EntregaOrmEntity>,
    private readonly tenant: TenantService,
  ) {}

  private toEntity(orm: EntregaOrmEntity): Entrega {
    return new Entrega(
      orm.id_entrega,
      orm.id_prestamo,
      orm.id_encargado,
      orm.fecha_entrega,
      orm.observaciones,
    );
  }

  async crear(entrega: Entrega): Promise<Entrega> {
    const orm = this.repo.create({
      id_sede: this.tenant.tenantId,
      id_prestamo: entrega.id_prestamo,
      id_encargado: entrega.id_encargado,
      fecha_entrega: entrega.fecha_entrega,
      observaciones: entrega.observaciones,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Entrega[]> {
    const where = this.tenant.isRoot ? {} : { id_sede: this.tenant.tenantId! };
    const data = await this.repo.find({ where });
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Entrega | null> {
    const orm = await this.repo.findOneBy({ id_entrega: id });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id: string, data: Partial<Entrega>): Promise<Entrega> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id_entrega: id });
    if (!orm) throw new Error(`Entrega con id ${id} no encontrada`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
