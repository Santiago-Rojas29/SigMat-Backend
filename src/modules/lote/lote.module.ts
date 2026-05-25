import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoteOrmEntity } from './infrastructure/entities/lote.orm-entity';
import { LoteTypeOrmRepository } from './infrastructure/adapters/out/lote.typeorm-repository';
import { LoteController } from './infrastructure/adapters/in/lote.controller';
import { CreateLoteUseCase } from './application/use-cases/create-lote.use-case';
import { ActualizarLoteUseCase } from './application/use-cases/actualizar-lote.use-case';
import { EliminarLoteUseCase } from './application/use-cases/eliminar-lote.use-case';
import { ObtenerPorIdUseCase } from './application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from './application/use-cases/obtener-todos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([LoteOrmEntity])],
  controllers: [LoteController],
  providers: [
    CreateLoteUseCase,
    ActualizarLoteUseCase,
    EliminarLoteUseCase,
    ObtenerPorIdUseCase,
    ObtenerTodosUseCase,
    {
      provide: 'LoteRepository',
      useClass: LoteTypeOrmRepository,
    },
  ],
})
export class LoteModule {}
