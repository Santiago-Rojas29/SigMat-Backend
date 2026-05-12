import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntregaUnidadOrmEntity } from './infrastructure/entities/entrega_unidad.orm-entity';
import { EntregaUnidadTypeOrmRepository } from './infrastructure/adapters/out/entrega_unidad.typeorm-repository';
import { EntregaUnidadController } from './infrastructure/adapters/in/entrega_unidad.controller';

import { CreateEntregaUnidadUseCase } from './application/use-cases/crear.use-case';
import { ObtenerTodosEntregaUnidadUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerEntregaUnidadPorIdsUseCase } from './application/use-cases/obtener-por-id.use-case';
import { EliminarEntregaUnidadUseCase } from './application/use-cases/eliminar.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([EntregaUnidadOrmEntity])],
  controllers: [EntregaUnidadController],
  providers: [
    CreateEntregaUnidadUseCase,
    ObtenerTodosEntregaUnidadUseCase,
    ObtenerEntregaUnidadPorIdsUseCase,
    EliminarEntregaUnidadUseCase,
    {
      provide: 'EntregaUnidadRepository',
      useClass: EntregaUnidadTypeOrmRepository,
    },
  ],
})
export class EntregaUnidadModule {}
