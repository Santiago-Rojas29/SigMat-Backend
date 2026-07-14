import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrestamoOrmEntity } from './infrastructure/entities/prestamo.orm-entity';
import { PrestamoTypeOrmRepository } from './infrastructure/adapters/out/prestamo.typeorm-repository';
import { PrestamoController } from './infrastructure/adapters/in/prestamo.controller';

import { CreatePrestamoUseCase } from './application/use-cases/crear.use-case';
import { ActualizarPrestamoUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarPrestamoUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerPorIdUseCase } from './application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from './application/use-cases/obtener-todos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PrestamoOrmEntity])],
  controllers: [PrestamoController],
  providers: [
    CreatePrestamoUseCase,
    ActualizarPrestamoUseCase,
    EliminarPrestamoUseCase,
    ObtenerPorIdUseCase,
    ObtenerTodosUseCase,
    {
      provide: 'PrestamoRepository',
      useClass: PrestamoTypeOrmRepository,
    },
  ],
})
export class PrestamoModule {}
