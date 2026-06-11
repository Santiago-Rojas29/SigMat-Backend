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
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'clave_secreta_jwt_sigmat_2024'),
      }),
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
