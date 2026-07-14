import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';
import { EstadoSolicitud } from '../../domain/entities/solicitud.entity';
import { NotificacionesService } from '../../../notificaciones/notificaciones.service';
import { KardexAutoService } from '../../../kardex/application/services/kardex-auto.service';
import { TenantService } from 'src/common/tenant/tenant.service';

@Injectable()
export class EntregarSolicitudUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly notificaciones: NotificacionesService,
    private readonly kardexAuto: KardexAutoService,
    private readonly tenant: TenantService,
  ) {}

  /**
   * Entrega un lote dentro de una transacción.
   * Si el solicitante tiene cuota de ficha para ese lote → descuenta de lote_ficha.cantidad.
   * Si no → descuenta de lote.cantidad_disponible (lote sin asignar a ficha).
   */
  private async entregarLote(
    manager: EntityManager,
    idSolicitante: string,
    idEntrega: string,
    idLote: string,
    cantidadSolicitada: number,
  ): Promise<void> {
    const [fichaRow]: { id: string; cantidad: number }[] = await manager.query(
      `SELECT lf.id, lf.cantidad
       FROM lote_ficha lf
       INNER JOIN ficha_usuario fu ON fu.id_ficha = lf.id_ficha
       WHERE fu.id_usuario = $1 AND lf.id_lote = $2
       LIMIT 1`,
      [idSolicitante, idLote],
    );

    if (fichaRow) {
      if (fichaRow.cantidad < cantidadSolicitada)
        throw new BadRequestException(
          `Cuota de ficha insuficiente para el lote ${idLote} (disponible: ${fichaRow.cantidad})`,
        );
      await manager.query(
        `UPDATE lote_ficha SET cantidad = cantidad - $1 WHERE id = $2`,
        [cantidadSolicitada, fichaRow.id],
      );
    } else {
      const [loteRow]: { cantidad_disponible: number }[] = await manager.query(
        `SELECT cantidad_disponible FROM lote WHERE id_lote = $1`,
        [idLote],
      );
      if (!loteRow || loteRow.cantidad_disponible < cantidadSolicitada)
        throw new BadRequestException(`Stock insuficiente para el lote ${idLote}`);
      await manager.query(
        `UPDATE lote SET cantidad_disponible = cantidad_disponible - $1 WHERE id_lote = $2`,
        [cantidadSolicitada, idLote],
      );
    }

    await manager.query(
      `INSERT INTO entrega_lote (id_entrega, id_lote, cantidad_entregada, cantidad_devuelta)
       VALUES ($1, $2, $3, 0)`,
      [idEntrega, idLote, cantidadSolicitada],
    );
  }

  async execute(
    id: string,
    data: { id_bodega: string; fecha_limite?: string; observaciones?: string },
  ): Promise<
    | { id_prestamo: string; id_validacion: string; id_entrega: string; requiere_devolucion: true }
    | { id_validacion: string; id_entrega: string; requiere_devolucion: false }
  > {
    const solicitud = await this.repo.obtenerPorId(id);
    if (!solicitud) throw new NotFoundException('Solicitud no encontrada');
    if (solicitud.estado !== EstadoSolicitud.APROBADO)
      throw new BadRequestException('La solicitud debe estar aprobada para marcarla como entregada');

    type EntregarResult =
      | { id_prestamo: string; id_validacion: string; id_entrega: string; requiere_devolucion: true }
      | { id_validacion: string; id_entrega: string; requiere_devolucion: false };

    const result: EntregarResult = await this.dataSource.transaction(async (manager) => {
      // 1. Marcar solicitud como entregada
      await manager.query(
        `UPDATE solicitud SET estado = 'entregado', fecha_entrega = NOW() WHERE id_solicitud = $1`,
        [id],
      );

      // 2. Crear validación
      const sedeId = this.tenant.tenantId;
      const [val] = await manager.query(
        `INSERT INTO validacion (id, id_sede, id_solicitud, id_validador, fecha_validacion, decision, observaciones)
         VALUES (gen_random_uuid(), $1, $2, $3, NOW(), 'aprobado', $4)
         RETURNING id`,
        [sedeId, id, data.id_bodega, data.observaciones ?? ''],
      );

      // 3. Consultar ítems
      const unidades: { id_unidad: string }[] = await manager.query(
        `SELECT id_unidad FROM solicitud_unidad WHERE id_solicitud = $1`,
        [id],
      );
      const lotes: { id_lote: string; cantidad_solicitada: number }[] = await manager.query(
        `SELECT id_lote, cantidad_solicitada FROM solicitud_lote WHERE id_solicitud = $1`,
        [id],
      );

      const tieneUnidades = unidades.length > 0;

      if (tieneUnidades) {
        // 4a. Con unidades → préstamo devolvible
        const fechaLimite = data.fecha_limite ? new Date(data.fecha_limite) : null;
        if (!fechaLimite || isNaN(fechaLimite.getTime()))
          throw new BadRequestException('La solicitud contiene unidades físicas y requiere una fecha límite de devolución');

        const [pre] = await manager.query(
          `INSERT INTO prestamo (id, id_sede, id_usuario, id_validacion, fecha_limite, estado)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, 'activo')
           RETURNING id`,
          [sedeId, solicitud.id_solicitante, val.id, fechaLimite],
        );

        const [ent] = await manager.query(
          `INSERT INTO entrega (id_sede, id_prestamo, id_encargado, fecha_entrega, observaciones)
           VALUES ($1, $2, $3, NOW(), $4)
           RETURNING id_entrega`,
          [sedeId, pre.id, data.id_bodega, data.observaciones ?? 'Entrega registrada desde solicitud'],
        );

        const entId = String(ent.id_entrega);

        for (const u of unidades) {
          await manager.query(
            `INSERT INTO entrega_unidad (id_entrega, id_unidad) VALUES ($1, $2)`,
            [entId, u.id_unidad],
          );
          await manager.query(`UPDATE unidad SET estado = 'prestado' WHERE id_unidad = $1`, [u.id_unidad]);
        }

        for (const l of lotes) {
          await this.entregarLote(manager, solicitud.id_solicitante, entId, l.id_lote, l.cantidad_solicitada);
        }

        return { id_prestamo: pre.id, id_validacion: val.id, id_entrega: entId, requiere_devolucion: true };
      } else {
        // 4b. Solo lotes (consumibles) → entrega directa sin préstamo
        const [ent] = await manager.query(
          `INSERT INTO entrega (id_sede, id_prestamo, id_encargado, fecha_entrega, observaciones)
           VALUES ($1, NULL, $2, NOW(), $3)
           RETURNING id_entrega`,
          [sedeId, data.id_bodega, data.observaciones ?? 'Entrega registrada desde solicitud'],
        );

        const entId = String(ent.id_entrega);

        for (const l of lotes) {
          await this.entregarLote(manager, solicitud.id_solicitante, entId, l.id_lote, l.cantidad_solicitada);
        }

        return { id_validacion: val.id, id_entrega: entId, requiere_devolucion: false };
      }
    });

    this.notificaciones.notificarEntrega(id, solicitud.id_solicitante).catch(() => {});
    this.notificaciones.notificarActualizacion('solicitud');
    if ((result as any).requiere_devolucion) this.notificaciones.notificarActualizacion('prestamo');
    this.kardexAuto.salidaEntrega(result.id_entrega).catch(() => {});

    return result;
  }
}
