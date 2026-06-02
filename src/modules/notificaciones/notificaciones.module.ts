import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesProcessor } from './notificaciones.processor';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'notificaciones' }),
  ],
  providers: [NotificacionesService, NotificacionesProcessor],
  exports: [NotificacionesService],
})
export class NotificacionesModule {}
