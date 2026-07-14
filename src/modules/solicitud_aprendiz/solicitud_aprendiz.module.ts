import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudAprendizOrmEntity } from './infrastructure/entities/solicitud_aprendiz.orm-entity';
import { SolicitudAprendizTypeOrmRepository } from './infrastructure/adapters/out/solicitud_aprendiz.typeorm-repository';
import { SolicitudAprendizController } from './infrastructure/adapters/in/solicitud-aprendiz.controller';
import { CreateSolicitudAprendizUseCase } from './application/use-cases/create-solicitud-aprendiz.use-case';
import { ObtenerTodosUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdUseCase } from './application/use-cases/obtener-por-id.use-case';
import { EliminarSolicitudAprendizUseCase } from './application/use-cases/eliminar-solicitud-aprendiz.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudAprendizOrmEntity])],
  controllers: [SolicitudAprendizController],
  providers: [
    CreateSolicitudAprendizUseCase,
    ObtenerTodosUseCase,
    ObtenerPorIdUseCase,
    EliminarSolicitudAprendizUseCase,
    {
      provide: 'SolicitudAprendizRepository',
      useClass: SolicitudAprendizTypeOrmRepository,
    },
  ],
})
export class SolicitudAprendizModule {}
