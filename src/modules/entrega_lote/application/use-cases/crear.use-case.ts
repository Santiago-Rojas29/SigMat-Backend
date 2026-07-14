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
    const entregaLote = new EntregaLote(data.id_entrega, data.id_lote, data.cantidad_entregada, data.cantidad_devuelta);
    entregaLote.validar();

    // Chequeo y descuento en un solo UPDATE condicional: dos entregas simultáneas
    // no pueden pasar ambas la validación y dejar el stock en negativo.
    // TypeORM devuelve [filas, contador] para UPDATE (verificado contra la BD).
    const [[descontado]]: [{ cantidad_disponible: number }[], number] = await this.dataSource.query(
      `UPDATE lote SET cantidad_disponible = cantidad_disponible - $1
       WHERE id_lote = $2 AND cantidad_disponible >= $1
       RETURNING cantidad_disponible`,
      [data.cantidad_entregada, data.id_lote],
    );
    if (!descontado) {
      const [lote] = await this.dataSource.query(
        `SELECT cantidad_disponible FROM lote WHERE id_lote = $1`,
        [data.id_lote],
      );
      if (!lote) throw new BadRequestException('Lote no encontrado');
      throw new BadRequestException(`Stock insuficiente (disponible: ${lote.cantidad_disponible})`);
    }

    let creada: EntregaLote;
    try {
      creada = await this.repo.crear(entregaLote);
    } catch (e) {
      // Compensar el descuento si la fila de entrega no se pudo crear
      await this.dataSource.query(
        `UPDATE lote SET cantidad_disponible = cantidad_disponible + $1 WHERE id_lote = $2`,
        [data.cantidad_entregada, data.id_lote],
      );
      throw e;
    }

    const saldo = descontado.cantidad_disponible;
    this.kardexAuto.salidaLote(data.id_lote, data.cantidad_entregada, saldo, data.id_entrega).catch(() => {});

    return creada;
  }
}
