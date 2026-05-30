import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntregaLoteOrmEntity } from './infrastructure/entities/entrega_lote.orm-entity';
import { EntregaLoteTypeOrmRepository } from './infrastructure/adapters/out/entrega_lote.typeorm-repository';
import { EntregaLoteController } from './infrastructure/adapters/in/entrega_lote.controller';

import { CrearEntregaLoteUseCase } from './application/use-cases/crear.use-case';
import { ActualizarEntregaLoteUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarEntregaLoteUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerTodosEntregaLoteUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerEntregaLotePorIdsUseCase } from './application/use-cases/obtener-por-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([EntregaLoteOrmEntity])],
  controllers: [EntregaLoteController],
  providers: [
    CrearEntregaLoteUseCase,
    ActualizarEntregaLoteUseCase,
    EliminarEntregaLoteUseCase,
    ObtenerTodosEntregaLoteUseCase,
    ObtenerEntregaLotePorIdsUseCase,
    {
      provide: 'EntregaLoteRepository',
      useClass: EntregaLoteTypeOrmRepository,
    },
  ],
})
export class EntregaLoteModule {}
