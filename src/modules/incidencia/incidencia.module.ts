import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidenciaOrmEntity } from './infrastructure/entities/incidencia.orm-entity';
import { IncidenciaController } from './infrastructure/adapters/in/incidencia.controller';
import { IncidenciaTypeOrmRepository } from './infrastructure/adapters/out/incidencia.typeorm-repository';
import { CrearIncidenciaUseCase } from './application/use-cases/crear.use-case';
import { ActualizarIncidenciaUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarIncidenciaUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerTodosIncidenciaUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdIncidenciaUseCase } from './application/use-cases/obtener-por-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([IncidenciaOrmEntity])],
  controllers: [IncidenciaController],
  providers: [
    CrearIncidenciaUseCase,
    ActualizarIncidenciaUseCase,
    EliminarIncidenciaUseCase,
    ObtenerTodosIncidenciaUseCase,
    ObtenerPorIdIncidenciaUseCase,
    { provide: 'IncidenciaRepository', useClass: IncidenciaTypeOrmRepository },
  ],
})
export class IncidenciaModule {}
