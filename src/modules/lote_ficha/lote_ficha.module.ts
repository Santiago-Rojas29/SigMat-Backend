import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoteFichaOrmEntity }          from './infrastructure/entities/lote_ficha.orm-entity';
import { LoteFichaTypeOrmRepository }   from './infrastructure/adapters/out/lote_ficha.typeorm-repository';
import { LoteFichaController }          from './infrastructure/adapters/in/lote_ficha.controller';

import { CrearLoteFichaUseCase }        from './application/use-cases/crear.use-case';
import { ObtenerTodosLoteFichaUseCase } from './application/use-cases/obtener-todos.use-case';
import { ActualizarLoteFichaUseCase }   from './application/use-cases/actualizar.use-case';
import { EliminarLoteFichaUseCase }     from './application/use-cases/eliminar.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([LoteFichaOrmEntity])],
  controllers: [LoteFichaController],
  providers: [
    CrearLoteFichaUseCase,
    ObtenerTodosLoteFichaUseCase,
    ActualizarLoteFichaUseCase,
    EliminarLoteFichaUseCase,
    {
      provide: 'LoteFichaRepository',
      useClass: LoteFichaTypeOrmRepository,
    },
  ],
})
export class LoteFichaModule {}
