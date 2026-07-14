import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaOrmEntity } from './infrastructure/entities/area.orm-entity';
import { AreaTypeOrmRepository } from './infrastructure/adapters/out/area.typeorm-repository';
import { AreaController } from './infrastructure/adapters/in/area.controller';
import { CreateAreaUseCase } from './application/use-cases/create-area.use-case';
import { ActualizarAreaUseCase } from './application/use-cases/actualizar-area.use-case';
import { EliminarAreaUseCase } from './application/use-cases/eliminar-area.use-case';
import { ObtenerPorIdAreaUseCase } from './application/use-cases/obtener-por-id-area.use-case';
import { ObtenerTodosAreaUseCase } from './application/use-cases/obtener-todos-area.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([AreaOrmEntity])],
  controllers: [AreaController],
  providers: [
    CreateAreaUseCase,
    ActualizarAreaUseCase,
    EliminarAreaUseCase,
    ObtenerPorIdAreaUseCase,
    ObtenerTodosAreaUseCase,
    {
      provide: 'AreaRepository',
      useClass: AreaTypeOrmRepository,
    },
  ],
})
export class AreaModule {}
