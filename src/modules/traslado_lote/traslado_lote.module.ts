import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrasladoLoteOrmEntity } from './infrastructure/entities/traslado_lote.orm-entity';
import { TrasladoLoteController } from './infrastructure/adapters/in/traslado_lote.controller';
import { TrasladoLoteTypeOrmRepository } from './infrastructure/adapters/out/traslado_lote.typeorm-repository';
import { CrearTrasladoLoteUseCase } from './application/use-cases/crear.use-case';
import { ObtenerTodosTrasladoLoteUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdsTrasladoLoteUseCase } from './application/use-cases/obtener-por-ids.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TrasladoLoteOrmEntity])],
  controllers: [TrasladoLoteController],
  providers: [
    CrearTrasladoLoteUseCase,
    ObtenerTodosTrasladoLoteUseCase,
    ObtenerPorIdsTrasladoLoteUseCase,
    { provide: 'TrasladoLoteRepository', useClass: TrasladoLoteTypeOrmRepository },
  ],
})
export class TrasladoLoteModule {}
