import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudOrmEntity }          from './infrastructure/entities/solicitud.orm-entity';
import { SolicitudTypeOrmRepository }  from './infrastructure/adapters/out/solicitud.typeorm-repository';
import { SolicitudController }         from './infrastructure/adapters/in/solicitud.controller';
import { CreateSolicitudUseCase }      from './application/use-cases/create-solicitud.use-case';
import { ActualizarSolicitudUseCase }  from './application/use-cases/actualizar-solicitud.use-case';
import { EliminarSolicitudUseCase }    from './application/use-cases/eliminar-solicitud.use-case';
import { ObtenerPorIdUseCase }         from './application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase }         from './application/use-cases/obtener-todos.use-case';
import { AprobarInstructorUseCase }    from './application/use-cases/aprobar-instructor.use-case';
import { AprobarAdminUseCase }         from './application/use-cases/aprobar-admin.use-case';
import { AprobarBodegaUseCase }        from './application/use-cases/aprobar-bodega.use-case';
import { EntregarSolicitudUseCase }    from './application/use-cases/entregar-solicitud.use-case';
import { RechazarSolicitudUseCase }    from './application/use-cases/rechazar-solicitud.use-case';
import { CancelarSolicitudUseCase }    from './application/use-cases/cancelar-solicitud.use-case';
import { NotificacionesModule }        from '../notificaciones/notificaciones.module';
import { RebacModule }                 from '../rebac/rebac.module';
import { AuthModule }                  from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitudOrmEntity]),
    NotificacionesModule,
    RebacModule,
    AuthModule,
  ],
  controllers: [SolicitudController],
  providers: [
    CreateSolicitudUseCase,
    ActualizarSolicitudUseCase,
    EliminarSolicitudUseCase,
    ObtenerPorIdUseCase,
    ObtenerTodosUseCase,
    AprobarInstructorUseCase,
    AprobarAdminUseCase,
    AprobarBodegaUseCase,
    EntregarSolicitudUseCase,
    RechazarSolicitudUseCase,
    CancelarSolicitudUseCase,
    {
      provide: 'SolicitudRepository',
      useClass: SolicitudTypeOrmRepository,
    },
  ],
})
export class SolicitudModule {}
