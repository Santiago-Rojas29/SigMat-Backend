import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoteFichaOrmEntity }          from './infrastructure/entities/lote_ficha.orm-entity';
import { LoteFichaTypeOrmRepository }  from './infrastructure/adapters/out/lote_ficha.typeorm-repository';
import { LoteFichaController }         from './infrastructure/adapters/in/lote-ficha.controller';
import { CreateLoteFichaUseCase }      from './application/use-cases/create-lote-ficha.use-case';
import { ObtenerTodosLoteFichaUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorLoteUseCase }       from './application/use-cases/obtener-por-lote.use-case';
import { ActualizarLoteFichaUseCase }  from './application/use-cases/actualizar-lote-ficha.use-case';
import { EliminarLoteFichaUseCase }    from './application/use-cases/eliminar-lote-ficha.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([LoteFichaOrmEntity])],
  controllers: [LoteFichaController],
  providers: [
    CreateLoteFichaUseCase,
    ObtenerTodosLoteFichaUseCase,
    ObtenerPorLoteUseCase,
    ActualizarLoteFichaUseCase,
    EliminarLoteFichaUseCase,
    {
      provide: 'LoteFichaRepository',
      useClass: LoteFichaTypeOrmRepository,
    },
  ],
})
export class LoteFichaModule {}
