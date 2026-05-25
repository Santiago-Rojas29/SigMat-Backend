import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SedeOrmEntity } from './infrastructure/entities/sede.orm-entity';
import { SedeTypeOrmRepository } from './infrastructure/adapters/out/sede.typeorm-repository';
import { SedeController } from './infrastructure/adapters/in/sede.controller';
import { CreateSedeUseCase } from './application/use-cases/create-sede.use-case';
import { ActualizarSedeUseCase } from './application/use-cases/actualizar-sede.use-case';
import { EliminarSedeUseCase } from './application/use-cases/eliminar-sede.use-case';
import { ObtenerPorIdSedeUseCase } from './application/use-cases/obtener-por-id-sede.use-case';
import { ObtenerTodosSedeUseCase } from './application/use-cases/obtener-todos-sede.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SedeOrmEntity])],
  controllers: [SedeController],
  providers: [
    CreateSedeUseCase,
    ActualizarSedeUseCase,
    EliminarSedeUseCase,
    ObtenerPorIdSedeUseCase,
    ObtenerTodosSedeUseCase,
    {
      provide: 'SedeRepository',
      useClass: SedeTypeOrmRepository,
    },
  ],
})
export class SedeModule {}
