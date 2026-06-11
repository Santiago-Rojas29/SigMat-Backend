import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotificacionOrmEntity, TipoNotificacion } from './notificacion.orm-entity';
import { NotificacionesGateway } from './notificaciones.gateway';

export interface CrearNotificacionParams {
  id_usuario: string;
  tipo: TipoNotificacion;
  titulo: string;
  mensaje: string;
  referencia_id?: string;
  referencia_tipo?: string;
}

@Injectable()
export class NotificacionesService {
  private readonly logger = new Logger(NotificacionesService.name);

  constructor(
    @InjectRepository(NotificacionOrmEntity)
    private readonly repo: Repository<NotificacionOrmEntity>,
    private readonly gateway: NotificacionesGateway,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async crear(params: CrearNotificacionParams): Promise<NotificacionOrmEntity> {
    const notif = this.repo.create({
      id_usuario:      params.id_usuario,
      tipo:            params.tipo,
      titulo:          params.titulo,
      mensaje:         params.mensaje,
      leida:           false,
      referencia_id:   params.referencia_id   ?? null,
      referencia_tipo: params.referencia_tipo ?? null,
    });
    const saved = await this.repo.save(notif);
    this.gateway.emitirAUsuario(params.id_usuario, {
      id_notificacion: saved.id_notificacion,
      tipo:            saved.tipo,
      titulo:          saved.titulo,
      mensaje:         saved.mensaje,
      leida:           saved.leida,
      fecha_creacion:  saved.fecha_creacion,
      referencia_id:   saved.referencia_id,
      referencia_tipo: saved.referencia_tipo,
    });
    return saved;
  }

  async listarPorUsuario(userId: string): Promise<NotificacionOrmEntity[]> {
    return this.repo.find({
      where: { id_usuario: userId },
      order: { fecha_creacion: 'DESC' },
      take: 50,
    });
  }

  async contarNoLeidas(userId: string): Promise<number> {
    return this.repo.count({ where: { id_usuario: userId, leida: false } });
  }

  async marcarLeida(id: string, userId: string): Promise<void> {
    await this.repo.update({ id_notificacion: id, id_usuario: userId }, { leida: true });
  }

  async marcarTodasLeidas(userId: string): Promise<void> {
    await this.repo.update({ id_usuario: userId, leida: false }, { leida: true });
  }

  // Called by AprobarBodegaUseCase and others
  async notificarCambioEstado(
    solicitudId: string,
    nuevoEstado: string,
    id_solicitante?: string,
  ): Promise<void> {
    if (!id_solicitante) {
      this.logger.warn(`notificarCambioEstado sin id_solicitante para solicitud=${solicitudId}`);
      return;
    }
    const etiquetas: Record<string, string> = {
      aprobado:             'aprobada',
      rechazado:            'rechazada',
      cancelado:            'cancelada',
      entregado:            'entregada',
      pendiente_bodega:     'en revisión de bodega',
      pendiente_admin:      'en revisión de administración',
      pendiente_instructor: 'en revisión del instructor',
    };
    const label = etiquetas[nuevoEstado.toLowerCase()] ?? nuevoEstado;
    await this.crear({
      id_usuario:      id_solicitante,
      tipo:            TipoNotificacion.SOLICITUD_ESTADO,
      titulo:          'Estado de solicitud actualizado',
      mensaje:         `Tu solicitud ha sido ${label}.`,
      referencia_id:   solicitudId,
      referencia_tipo: 'solicitud',
    });
  }

  notificarActualizacion(tipo: 'solicitud' | 'prestamo') {
    this.gateway.emitirRefresh(`${tipo}_actualizado`);
  }

  async notificarEntrega(solicitudId: string, id_solicitante: string): Promise<void> {
    await this.crear({
      id_usuario:      id_solicitante,
      tipo:            TipoNotificacion.SOLICITUD_ESTADO,
      titulo:          'Material entregado',
      mensaje:         'Tu solicitud fue procesada y el material entregado correctamente.',
      referencia_id:   solicitudId,
      referencia_tipo: 'solicitud',
    });
  }

  async notificarNuevaSolicitud(params: {
    solicitudId: string;
    tipo_flujo: string;
    tipo_prestamo: string;
    id_instructor?: string | null;
    id_bodega?: string | null;
  }): Promise<void> {
    const { solicitudId, tipo_flujo, tipo_prestamo, id_instructor, id_bodega } = params;

    if (tipo_flujo === 'aprendiz' && id_instructor) {
      await this.crear({
        id_usuario:      id_instructor,
        tipo:            TipoNotificacion.NUEVA_SOLICITUD,
        titulo:          'Nueva solicitud de material',
        mensaje:         'Un aprendiz ha enviado una solicitud pendiente de tu aprobación.',
        referencia_id:   solicitudId,
        referencia_tipo: 'solicitud',
      });
    } else if (tipo_flujo === 'instructor') {
      if (tipo_prestamo === 'interno' && id_bodega) {
        await this.crear({
          id_usuario:      id_bodega,
          tipo:            TipoNotificacion.NUEVA_SOLICITUD,
          titulo:          'Nueva solicitud de material',
          mensaje:         'Un instructor ha enviado una solicitud pendiente de tu aprobación.',
          referencia_id:   solicitudId,
          referencia_tipo: 'solicitud',
        });
      } else if (tipo_prestamo === 'externo') {
        const admins: { id: string }[] = await this.dataSource.query(
          `SELECT u.id FROM usuario u JOIN rol r ON u.id_rol = r.id WHERE r.nombre ILIKE '%admin%'`,
        );
        await Promise.all(
          admins.map(a =>
            this.crear({
              id_usuario:      a.id,
              tipo:            TipoNotificacion.NUEVA_SOLICITUD,
              titulo:          'Nueva solicitud de material (externo)',
              mensaje:         'Un instructor ha enviado una solicitud externa pendiente de tu aprobación.',
              referencia_id:   solicitudId,
              referencia_tipo: 'solicitud',
            }),
          ),
        );
      }
    }
  }

  async notificarDevolucion(id_entrega: string): Promise<void> {
    const rows: { id_encargado: string }[] = await this.dataSource.query(
      `SELECT id_encargado FROM entrega WHERE id_entrega = $1`,
      [id_entrega],
    );
    if (!rows.length || !rows[0].id_encargado) return;

    await this.crear({
      id_usuario:      rows[0].id_encargado,
      tipo:            TipoNotificacion.NUEVA_DEVOLUCION,
      titulo:          'Devolución de material registrada',
      mensaje:         'Se ha registrado la devolución de un préstamo bajo tu responsabilidad.',
      referencia_id:   id_entrega,
      referencia_tipo: 'entrega',
    });
  }
}
