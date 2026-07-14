import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificacionOrmEntity } from './notificacion.orm-entity';
import { NotificacionesGateway } from './notificaciones.gateway';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { NotificacionesCronService } from './notificaciones.cron';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificacionOrmEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET no está definido en el .env — la app no puede arrancar sin él.');
        }
        return { secret };
      },
    }),
  ],
  controllers: [NotificacionesController],
  providers: [
    NotificacionesGateway,
    NotificacionesService,
    NotificacionesCronService,
  ],
  exports: [NotificacionesService],
})
export class NotificacionesModule {}
