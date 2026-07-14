import { Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('notificaciones')
export class NotificacionesProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificacionesProcessor.name);

  async process(job: Job): Promise<void> {
    switch (job.name) {
      case 'cambio-estado-solicitud':
        await this.handleCambioEstado(job.data);
        break;
      case 'alerta-stock-critico':
        await this.handleStockCritico(job.data);
        break;
      default:
        this.logger.warn(`[QUEUE] Job desconocido: ${job.name}`);
    }
  }

  private async handleCambioEstado(data: {
    solicitudId: string;
    nuevoEstado: string;
    correo?: string;
  }): Promise<void> {
    this.logger.log(
      `[QUEUE] Solicitud ${data.solicitudId} → ${data.nuevoEstado}` +
        (data.correo ? ` | Notificando a: ${data.correo}` : ''),
    );
    // Aquí iría el envío real de correo al aprendiz/usuario
  }

  private async handleStockCritico(data: {
    material: string;
    codigoLote: string;
    porcentaje: number;
  }): Promise<void> {
    this.logger.warn(
      `[QUEUE] Stock crítico: "${data.material}" — Lote ${data.codigoLote} al ${data.porcentaje}%`,
    );
    // Aquí iría la notificación al encargado de bodega
  }
}
