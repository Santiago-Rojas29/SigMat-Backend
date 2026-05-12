import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudOrmEntity } from './infrastructure/entities/solicitud.orm-entity';
import { SolicitudTypeOrmRepository } from './infrastructure/adapters/out/solicitud.typeorm-repository';
import { SolicitudController } from './infrastructure/adapters/in/solicitud.controller';
import { CreateSolicitudUseCase } from './application/use-cases/create-solicitud.use-case';
import { ActualizarSolicitudUseCase } from './application/use-cases/actualizar-solicitud.use-case';
import { EliminarSolicitudUseCase } from './application/use-cases/eliminar-solicitud.use-case';
import { ObtenerPorIdUseCase } from './application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from './application/use-cases/obtener-todos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudOrmEntity])],
  controllers: [SolicitudController],
  providers: [
    CreateSolicitudUseCase,
    ActualizarSolicitudUseCase,
    EliminarSolicitudUseCase,
    ObtenerPorIdUseCase,
    ObtenerTodosUseCase,
    {
      provide: 'SolicitudRepository',
      useClass: SolicitudTypeOrmRepository,
    },
  ],
})
export class SolicitudModule {}
