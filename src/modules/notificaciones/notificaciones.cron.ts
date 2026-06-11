import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { NotificacionesService } from './notificaciones.service';
import { TipoNotificacion } from './notificacion.orm-entity';

@Injectable()
export class NotificacionesCronService {
  private readonly logger = new Logger(NotificacionesCronService.name);

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly notifService: NotificacionesService,
  ) {}

  // Every 5 minutes: find active loans expiring in the next 24 hours
  @Cron('*/5 * * * *')
  async verificarPrestamosProximosAVencer() {
    try {
      const prestamos: { id: string; id_usuario: string }[] =
        await this.dataSource.query(`
          SELECT p.id, p.id_usuario
          FROM prestamo p
          WHERE p.estado = 'activo'
            AND p.fecha_limite BETWEEN NOW() AND NOW() + INTERVAL '24 hours'
            AND NOT EXISTS (
              SELECT 1 FROM notificacion n
              WHERE n.referencia_id = p.id::text
                AND n.tipo = '${TipoNotificacion.PRESTAMO_PROXIMO}'
            )
        `);

      for (const p of prestamos) {
        await this.notifService.crear({
          id_usuario:      p.id_usuario,
          tipo:            TipoNotificacion.PRESTAMO_PROXIMO,
          titulo:          'Préstamo próximo a vencer',
          mensaje:         'Tienes un préstamo que vence en menos de 24 horas. Por favor gestiona la devolución a tiempo.',
          referencia_id:   p.id,
          referencia_tipo: 'prestamo',
        });
      }
    } catch (e) {
      this.logger.error(`verificarPrestamosProximosAVencer: ${e}`);
    }
  }

  // Every minute: find active loans already past their due date
  @Cron('* * * * *')
  async verificarPrestamosVencidos() {
    try {
      const prestamos: { id: string; id_usuario: string }[] =
        await this.dataSource.query(`
          SELECT p.id, p.id_usuario
          FROM prestamo p
          WHERE p.estado = 'activo'
            AND p.fecha_limite < NOW()
            AND NOT EXISTS (
              SELECT 1 FROM notificacion n
              WHERE n.referencia_id = p.id::text
                AND n.tipo = '${TipoNotificacion.PRESTAMO_VENCIDO}'
            )
        `);

      for (const p of prestamos) {
        await this.notifService.crear({
          id_usuario:      p.id_usuario,
          tipo:            TipoNotificacion.PRESTAMO_VENCIDO,
          titulo:          'Préstamo vencido',
          mensaje:         'Tu préstamo ha vencido. Por favor devuelve los materiales a la brevedad posible.',
          referencia_id:   p.id,
          referencia_tipo: 'prestamo',
        });
      }
    } catch (e) {
      this.logger.error(`verificarPrestamosVencidos: ${e}`);
    }
  }

  // Daily at 8am: find lots expiring within 7 days
  @Cron('0 8 * * *')
  async verificarLotesProximosAVencer() {
    try {
      const lotes: { id_lote: string; nombre_material: string }[] =
        await this.dataSource.query(`
          SELECT l.id_lote, m.nombre as nombre_material
          FROM lote l
          JOIN material m ON l.id_material = m.id
          WHERE l.fecha_vencimiento IS NOT NULL
            AND l.fecha_vencimiento BETWEEN NOW()::date AND (NOW() + INTERVAL '7 days')::date
            AND l.cantidad_disponible > 0
            AND NOT EXISTS (
              SELECT 1 FROM notificacion n
              WHERE n.referencia_id = l.id_lote::text
                AND n.tipo = '${TipoNotificacion.LOTE_VENCIMIENTO}'
                AND n.fecha_creacion > NOW() - INTERVAL '20 hours'
            )
        `);

      if (lotes.length === 0) return;

      const admins = await this.obtenerAdmins();
      for (const lote of lotes) {
        for (const admin of admins) {
          await this.notifService.crear({
            id_usuario:      admin.id,
            tipo:            TipoNotificacion.LOTE_VENCIMIENTO,
            titulo:          'Lote próximo a vencer',
            mensaje:         `El lote de "${lote.nombre_material}" vence en los próximos 7 días.`,
            referencia_id:   lote.id_lote,
            referencia_tipo: 'lote',
          });
        }
      }
    } catch (e) {
      this.logger.error(`verificarLotesProximosAVencer: ${e}`);
    }
  }

  // Daily at 9am: find lots with less than 15% stock remaining
  @Cron('0 9 * * *')
  async verificarStockBajo() {
    try {
      const lotes: { id_lote: string; nombre_material: string; porcentaje: string }[] =
        await this.dataSource.query(`
          SELECT l.id_lote, m.nombre as nombre_material,
                 ROUND((l.cantidad_disponible::decimal / NULLIF(l.cantidad_inicial, 0)) * 100, 1)::text as porcentaje
          FROM lote l
          JOIN material m ON l.id_material = m.id
          WHERE l.cantidad_inicial > 0
            AND (l.cantidad_disponible::decimal / NULLIF(l.cantidad_inicial, 0)) < 0.15
            AND NOT EXISTS (
              SELECT 1 FROM notificacion n
              WHERE n.referencia_id = l.id_lote::text
                AND n.tipo = '${TipoNotificacion.STOCK_BAJO}'
                AND n.fecha_creacion > NOW() - INTERVAL '20 hours'
            )
        `);

      if (lotes.length === 0) return;

      const admins = await this.obtenerAdmins();
      for (const lote of lotes) {
        for (const admin of admins) {
          await this.notifService.crear({
            id_usuario:      admin.id,
            tipo:            TipoNotificacion.STOCK_BAJO,
            titulo:          'Stock crítico de material',
            mensaje:         `El lote de "${lote.nombre_material}" está al ${lote.porcentaje}% de su stock inicial.`,
            referencia_id:   lote.id_lote,
            referencia_tipo: 'lote',
          });
        }
      }
    } catch (e) {
      this.logger.error(`verificarStockBajo: ${e}`);
    }
  }

  private async obtenerAdmins(): Promise<{ id: string }[]> {
    return this.dataSource.query(`
      SELECT u.id FROM usuario u
      JOIN rol r ON u.id_rol = r.id
      WHERE r.nombre ILIKE '%admin%' OR r.nombre ILIKE '%bodega%'
    `);
  }
}
