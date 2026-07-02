import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntregaLote } from '../../domain/entities/entrega_lote.entity';
import type { EntregaLoteRepository } from '../../domain/ports/entrega_lote.repository';
import { KardexAutoService } from '../../../kardex/application/services/kardex-auto.service';

@Injectable()
export class CrearEntregaLoteUseCase {
  constructor(
    @Inject('EntregaLoteRepository')
    private readonly repo: EntregaLoteRepository,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly kardexAuto: KardexAutoService,
  ) {}

  async execute(data: { id_entrega: string; id_lote: string; cantidad_entregada: number; cantidad_devuelta: number }): Promise<EntregaLote> {
    const [lote] = await this.dataSource.query(
      `SELECT cantidad_disponible FROM lote WHERE id_lote = $1`,
      [data.id_lote],
    );
    if (!lote) throw new BadRequestException('Lote no encontrado');
    if (lote.cantidad_disponible < data.cantidad_entregada)
      throw new BadRequestException(`Stock insuficiente (disponible: ${lote.cantidad_disponible})`);

    const entregaLote = new EntregaLote(data.id_entrega, data.id_lote, data.cantidad_entregada, data.cantidad_devuelta);
    entregaLote.validar();
    const creada = await this.repo.crear(entregaLote);

    const saldo = lote.cantidad_disponible - data.cantidad_entregada;
    await this.dataSource.query(`UPDATE lote SET cantidad_disponible = $1 WHERE id_lote = $2`, [saldo, data.id_lote]);
    this.kardexAuto.salidaLote(data.id_lote, data.cantidad_entregada, saldo, data.id_entrega).catch(() => {});

    return creada;
  }
}
