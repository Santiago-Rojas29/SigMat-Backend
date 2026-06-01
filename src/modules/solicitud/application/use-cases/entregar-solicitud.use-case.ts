import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { SolicitudRepository } from '../../domain/ports/solicitud.repository';
import { EstadoSolicitud } from '../../domain/entities/solicitud.entity';

@Injectable()
export class EntregarSolicitudUseCase {
  constructor(
    @Inject('SolicitudRepository')
    private readonly repo: SolicitudRepository,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute(
    id: string,
    data: { id_bodega: string; fecha_limite?: string; observaciones?: string },
  ): Promise<
    | { id_prestamo: string; id_validacion: string; requiere_devolucion: true }
    | { id_validacion: string; requiere_devolucion: false }
  > {
    const solicitud = await this.repo.obtenerPorId(id);
    if (!solicitud) throw new NotFoundException('Solicitud no encontrada');
    if (solicitud.estado !== EstadoSolicitud.APROBADO)
      throw new BadRequestException('La solicitud debe estar aprobada para marcarla como entregada');

    return this.dataSource.transaction(async (manager) => {
      // 1. Marcar solicitud como entregada
      await manager.query(
        `UPDATE solicitud SET estado = 'entregado', fecha_entrega = NOW() WHERE id_solicitud = $1`,
        [id],
      );

      // 2. Crear validación
      const [val] = await manager.query(
        `INSERT INTO validacion (id, id_solicitud, id_validador, fecha_validacion, decision, observaciones)
         VALUES (gen_random_uuid(), $1, $2, NOW(), 'aprobado', $3)
         RETURNING id`,
        [id, data.id_bodega, data.observaciones ?? ''],
      );

      // 3. Consultar ítems de la solicitud
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
        // 4a. Solicitud con unidades (no consumible) → crear préstamo devolvible
        const [pre] = await manager.query(
          `INSERT INTO prestamo (id, id_usuario, id_validacion, fecha_limite, estado)
           VALUES (gen_random_uuid(), $1, $2, $3, 'activo')
           RETURNING id`,
          [solicitud.id_solicitante, val.id, new Date(data.fecha_limite!)],
        );

        const [ent] = await manager.query(
          `INSERT INTO entrega (id_prestamo, id_encargado, fecha_entrega, observaciones)
           VALUES ($1, $2, NOW(), $3)
           RETURNING id_entrega`,
          [pre.id, data.id_bodega, data.observaciones ?? 'Entrega registrada desde solicitud'],
        );

        const entId = String(ent.id_entrega);

        for (const u of unidades) {
          await manager.query(
            `INSERT INTO entrega_unidad (id_entrega, id_unidad) VALUES ($1, $2)`,
            [entId, u.id_unidad],
          );
        }

        // Si la solicitud también tiene lotes, se registran en la misma entrega
        for (const l of lotes) {
          await manager.query(
            `INSERT INTO entrega_lote (id_entrega, id_lote, cantidad_entregada, cantidad_devuelta)
             VALUES ($1, $2, $3, 0)`,
            [entId, l.id_lote, l.cantidad_solicitada],
          );
        }

        return { id_prestamo: pre.id, id_validacion: val.id, requiere_devolucion: true };
      } else {
        // 4b. Solicitud solo con lotes (consumible/perecedero) → entrega directa sin préstamo
        const [ent] = await manager.query(
          `INSERT INTO entrega (id_prestamo, id_encargado, fecha_entrega, observaciones)
           VALUES (NULL, $1, NOW(), $2)
           RETURNING id_entrega`,
          [data.id_bodega, data.observaciones ?? 'Entrega registrada desde solicitud'],
        );

        const entId = String(ent.id_entrega);

        for (const l of lotes) {
          await manager.query(
            `INSERT INTO entrega_lote (id_entrega, id_lote, cantidad_entregada, cantidad_devuelta)
             VALUES ($1, $2, $3, 0)`,
            [entId, l.id_lote, l.cantidad_solicitada],
          );
        }

        return { id_validacion: val.id, requiere_devolucion: false };
      }
    });
  }
}
