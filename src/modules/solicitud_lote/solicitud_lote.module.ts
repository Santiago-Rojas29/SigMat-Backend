import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudLoteOrmEntity } from './infrastructure/entities/solicitud_lote.orm-entity';
import { SolicitudLoteTypeOrmRepository } from './infrastructure/adapters/out/solicitud_lote.typeorm-repository';
import { SolicitudLoteController } from './infrastructure/adapters/in/solicitud-lote.controller';
import { CreateSolicitudLoteUseCase } from './application/use-cases/create-solicitud-lote.use-case';
import { ActualizarSolicitudLoteUseCase } from './application/use-cases/actualizar-solicitud-lote.use-case';
import { EliminarSolicitudLoteUseCase } from './application/use-cases/eliminar-solicitud-lote.use-case';
import { ObtenerPorIdUseCase } from './application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from './application/use-cases/obtener-todos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudLoteOrmEntity])],
  controllers: [SolicitudLoteController],
  providers: [
    CreateSolicitudLoteUseCase,
    ActualizarSolicitudLoteUseCase,
    EliminarSolicitudLoteUseCase,
    ObtenerPorIdUseCase,
    ObtenerTodosUseCase,
    {
      provide: 'SolicitudLoteRepository',
      useClass: SolicitudLoteTypeOrmRepository,
    },
  ],
})
export class SolicitudLoteModule {}
