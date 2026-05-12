import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadOrmEntity } from './infrastructure/entities/unidad.orm-entity';
import { UnidadTypeOrmRepository } from './infrastructure/adapters/out/unidad.typeorm-repository';
import { UnidadController } from './infrastructure/adapters/in/unidad.controller';
import { CreateUnidadUseCase } from './application/use-cases/create-unidad.use-case';
import { ActualizarUnidadUseCase } from './application/use-cases/actualizar-unidad.use-case';
import { EliminarUnidadUseCase } from './application/use-cases/eliminar-unidad.use-case';
import { ObtenerPorIdUseCase } from './application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from './application/use-cases/obtener-todos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadOrmEntity])],
  controllers: [UnidadController],
  providers: [
    CreateUnidadUseCase,
    ActualizarUnidadUseCase,
    EliminarUnidadUseCase,
    ObtenerPorIdUseCase,
    ObtenerTodosUseCase,
    {
      provide: 'UnidadRepository',
      useClass: UnidadTypeOrmRepository,
    },
  ],
})
export class UnidadModule {}
