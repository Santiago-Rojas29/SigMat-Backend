import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectQueue('notificaciones') private readonly queue: Queue,
  ) {}

  async notificarCambioEstado(
    solicitudId: string,
    nuevoEstado: string,
    correo?: string,
  ): Promise<void> {
    await this.queue.add(
      'cambio-estado-solicitud',
      { solicitudId, nuevoEstado, correo },
      { attempts: 3, backoff: { type: 'exponential', delay: 1000 } },
    );
  }

  async alertarStockCritico(
    material: string,
    codigoLote: string,
    porcentaje: number,
  ): Promise<void> {
    await this.queue.add(
      'alerta-stock-critico',
      { material, codigoLote, porcentaje },
      { attempts: 2 },
    );
  }
}
