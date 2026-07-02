import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntregaLote } from '../../domain/entities/entrega_lote.entity';
import type { EntregaLoteRepository } from '../../domain/ports/entrega_lote.repository';
import { KardexAutoService } from '../../../kardex/application/services/kardex-auto.service';

@Injectable()
export class ActualizarEntregaLoteUseCase {
  constructor(
    @Inject('EntregaLoteRepository')
    private readonly repo: EntregaLoteRepository,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly kardexAuto: KardexAutoService,
  ) {}

  async execute(id_entrega: string, id_lote: string, data: { cantidad_entregada?: number; cantidad_devuelta?: number }): Promise<EntregaLote> {
    const existente = await this.repo.obtenerPorIds(id_entrega, id_lote);
    if (!existente) throw new NotFoundException(`EntregaLote ${id_entrega}/${id_lote} no encontrada`);

    const mapped: Partial<EntregaLote> = {
      ...(data.cantidad_entregada !== undefined && { cantidad_entregada: data.cantidad_entregada }),
      ...(data.cantidad_devuelta !== undefined && { cantidad_devuelta: data.cantidad_devuelta }),
    };
    const actualizada = await this.repo.actualizar(id_entrega, id_lote, mapped);

    if (data.cantidad_devuelta !== undefined) {
      const delta = data.cantidad_devuelta - existente.cantidad_devuelta;
      if (delta !== 0) {
        // Intentar restaurar a la cuota de la ficha (vía entrega → préstamo → usuario → ficha_usuario → lote_ficha)
        const [fichaRow]: { id: string; cantidad: number }[] = await this.dataSource.query(
          `SELECT lf.id, lf.cantidad
           FROM entrega e
           LEFT JOIN prestamo p ON p.id = e.id_prestamo
           LEFT JOIN ficha_usuario fu ON fu.id_usuario = p.id_usuario
           LEFT JOIN lote_ficha lf ON lf.id_ficha = fu.id_ficha AND lf.id_lote = $1
           WHERE e.id_entrega = $2
           LIMIT 1`,
          [id_lote, id_entrega],
        );

        if (fichaRow?.id) {
          // Ajustar cuota de la ficha: devolución aumenta la cuota, retiro extra la reduce
          await this.dataSource.query(
            `UPDATE lote_ficha SET cantidad = cantidad + $1 WHERE id = $2`,
            [delta, fichaRow.id],
          );
        } else {
          // Sin ficha → restaurar a lote.cantidad_disponible como antes
          const [lote] = await this.dataSource.query(
            `SELECT cantidad_disponible FROM lote WHERE id_lote = $1`,
            [id_lote],
          );
          const saldo = lote.cantidad_disponible + delta;
          await this.dataSource.query(
            `UPDATE lote SET cantidad_disponible = $1 WHERE id_lote = $2`,
            [saldo, id_lote],
          );
          if (delta > 0) {
            this.kardexAuto.entradaDevolucionLote(id_lote, delta, saldo, id_entrega).catch(() => {});
          } else {
            this.kardexAuto.salidaLote(id_lote, -delta, saldo, id_entrega).catch(() => {});
          }
        }
      }
    }

    return actualizada;
  }
}
