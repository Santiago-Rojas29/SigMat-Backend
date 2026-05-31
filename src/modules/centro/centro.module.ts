import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CentroOrmEntity } from './infrastructure/entities/centro.orm-entity';
import { CentroTypeOrmRepository } from './infrastructure/adapters/out/centro.typeorm-repository';
import { CentroController } from './infrastructure/adapters/in/centro.controller';

import { CreateCentroUseCase } from './application/use-cases/create-centro.use-case';
import { ActualizarCentroUseCase } from './application/use-cases/actualizar-centro.use-case';
import { EliminarCentroUseCase } from './application/use-cases/eliminar-centro.use-case';
import { ObtenerPorIdUseCase } from './application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from './application/use-cases/obtener-todos.use-case';

@Module({
  controllers: [CentroController],
  imports: [TypeOrmModule.forFeature([CentroOrmEntity])],
  providers: [
    CreateCentroUseCase,
    ActualizarCentroUseCase,
    EliminarCentroUseCase,
    ObtenerPorIdUseCase,
    ObtenerTodosUseCase,
    {
      provide: 'CentroRepository',
      useClass: CentroTypeOrmRepository,
    },
  ],
})
export class CentroModule {}
