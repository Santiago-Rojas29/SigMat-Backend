import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaOrmEntity } from './infrastructure/entities/ficha.orm-entity';
import { FichaTypeOrmRepository } from './infrastructure/adapters/out/ficha.typeorm-repository';
import { FichaController } from './infrastructure/adapters/in/ficha.controller';
import { CreateFichaUseCase } from './application/use-cases/create-ficha.use-case';
import { ActualizarFichaUseCase } from './application/use-cases/actualizar-ficha.use-case';
import { EliminarFichaUseCase } from './application/use-cases/eliminar-ficha.use-case';
import { ObtenerPorIdFichaUseCase } from './application/use-cases/obtener-por-id-ficha.use-case';
import { ObtenerTodosFichaUseCase } from './application/use-cases/obtener-todos-ficha.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([FichaOrmEntity])],
  controllers: [FichaController],
  providers: [
    CreateFichaUseCase,
    ActualizarFichaUseCase,
    EliminarFichaUseCase,
    ObtenerPorIdFichaUseCase,
    ObtenerTodosFichaUseCase,
    {
      provide: 'FichaRepository',
      useClass: FichaTypeOrmRepository,
    },
  ],
})
export class FichaModule {}
