import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudUnidadOrmEntity } from './infrastructure/entities/solicitud_unidad.orm-entity';
import { SolicitudUnidadTypeOrmRepository } from './infrastructure/adapters/out/solicitud_unidad.typeorm-repository';
import { SolicitudUnidadController } from './infrastructure/adapters/in/solicitud-unidad.controller';
import { CreateSolicitudUnidadUseCase } from './application/use-cases/create-solicitud-unidad.use-case';
import { ActualizarSolicitudUnidadUseCase } from './application/use-cases/actualizar-solicitud-unidad.use-case';
import { EliminarSolicitudUnidadUseCase } from './application/use-cases/eliminar-solicitud-unidad.use-case';
import { ObtenerPorIdUseCase } from './application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from './application/use-cases/obtener-todos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudUnidadOrmEntity])],
  controllers: [SolicitudUnidadController],
  providers: [
    CreateSolicitudUnidadUseCase,
    ActualizarSolicitudUnidadUseCase,
    EliminarSolicitudUnidadUseCase,
    ObtenerPorIdUseCase,
    ObtenerTodosUseCase,
    {
      provide: 'SolicitudUnidadRepository',
      useClass: SolicitudUnidadTypeOrmRepository,
    },
  ],
})
export class SolicitudUnidadModule {}
