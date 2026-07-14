import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kardex } from '../../../domain/entities/kardex.entity';
import { KardexRepository } from '../../../domain/ports/kardex.repository';
import { KardexOrmEntity } from '../../entities/kardex.orm-entity';
import { TenantService } from 'src/common/tenant/tenant.service';

@Injectable()
export class KardexTypeOrmRepository implements KardexRepository {
  constructor(
    @InjectRepository(KardexOrmEntity)
    private readonly repo: Repository<KardexOrmEntity>,
    private readonly tenant: TenantService,
  ) {}

  private toEntity(orm: KardexOrmEntity): Kardex {
    return new Kardex(
      orm.id,
      orm.tipo_movimiento,
      orm.cantidad,
      orm.fecha_movimiento,
      orm.saldo,
      orm.id_unidad,
      orm.id_lote,
      orm.id_entrega,
      orm.id_devolucion,
      orm.id_traslado,
      orm.id_incidencia,
    );
  }

  async crear(entity: Kardex): Promise<Kardex> {
    const orm = this.repo.create({
      id_sede: this.tenant.tenantId,
      tipo_movimiento: entity.tipo_movimiento,
      cantidad: entity.cantidad,
      fecha_movimiento: entity.fecha_movimiento,
      saldo: entity.saldo,
      id_unidad: entity.id_unidad,
      id_lote: entity.id_lote,
      id_entrega: entity.id_entrega,
      id_devolucion: entity.id_devolucion,
      id_traslado: entity.id_traslado,
      id_incidencia: entity.id_incidencia,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Kardex[]> {
    const where = this.tenant.isRoot ? {} : { id_sede: this.tenant.tenantId! };
    const data = await this.repo.find({ where });
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Kardex | null> {
    const orm = await this.repo.findOneBy({ id });
    if (!orm) return null;
    return this.toEntity(orm);
  }

  async actualizar(id: string, data: Partial<Kardex>): Promise<Kardex> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Kardex con id ${id} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
