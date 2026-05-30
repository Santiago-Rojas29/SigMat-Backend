import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrasladoOrmEntity } from './infrastructure/entities/traslado.orm-entity';
import { TrasladoController } from './infrastructure/adapters/in/traslado.controller';
import { TrasladoTypeOrmRepository } from './infrastructure/adapters/out/traslado.typeorm-repository';
import { CrearTrasladoUseCase } from './application/use-cases/crear.use-case';
import { ActualizarTrasladoUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarTrasladoUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerTodosTrasladoUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdTrasladoUseCase } from './application/use-cases/obtener-por-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TrasladoOrmEntity])],
  controllers: [TrasladoController],
  providers: [
    CrearTrasladoUseCase,
    ActualizarTrasladoUseCase,
    EliminarTrasladoUseCase,
    ObtenerTodosTrasladoUseCase,
    ObtenerPorIdTrasladoUseCase,
    { provide: 'TrasladoRepository', useClass: TrasladoTypeOrmRepository },
  ],
})
export class TrasladoModule {}
