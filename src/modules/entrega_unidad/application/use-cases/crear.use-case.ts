import { Injectable, Inject } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntregaUnidad } from '../../domain/entities/entrega_unidad.entity';
import type { EntregaUnidadRepository } from '../../domain/ports/entrega_unidad.repository';
import { KardexAutoService } from '../../../kardex/application/services/kardex-auto.service';

@Injectable()
export class CreateEntregaUnidadUseCase {
  constructor(
    @Inject('EntregaUnidadRepository')
    private readonly repo: EntregaUnidadRepository,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly kardexAuto: KardexAutoService,
  ) {}

  async execute(data: { id_entrega: string; id_unidad: string }): Promise<EntregaUnidad> {
    const entregaUnidad = new EntregaUnidad(data.id_entrega, data.id_unidad);
    entregaUnidad.validar();
    const creada = await this.repo.crear(entregaUnidad);

    await this.dataSource.query(`UPDATE unidad SET estado = 'prestado' WHERE id_unidad = $1`, [data.id_unidad]);
    this.kardexAuto.salidaEntregaUnidad(data.id_unidad, data.id_entrega).catch(() => {});

    return creada;
  }
}
