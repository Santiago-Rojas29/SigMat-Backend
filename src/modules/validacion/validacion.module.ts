import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ValidacionOrmEntity } from './infrastructure/entities/validacion.orm-entity';
import { ValidacionTypeOrmRepository } from './infrastructure/adapters/out/validacion.typeorm-repository';
import { ValidacionController } from './infrastructure/adapters/in/validacion.controller';

import { CreateValidacionUseCase } from './application/use-cases/create-validacion.use-case';
import { ActualizarValidacionUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarValidacionUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerValidacionPorIdUseCase } from './application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosValidacionUseCase } from './application/use-cases/obtener-todos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ValidacionOrmEntity])],
  controllers: [ValidacionController],
  providers: [
    CreateValidacionUseCase,
    ActualizarValidacionUseCase,
    EliminarValidacionUseCase,
    ObtenerValidacionPorIdUseCase,
    ObtenerTodosValidacionUseCase,
    {
      provide: 'ValidacionRepository',
      useClass: ValidacionTypeOrmRepository,
    },
  ],
})
export class ValidacionModule {}
