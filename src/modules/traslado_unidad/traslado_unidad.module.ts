import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrasladoUnidadOrmEntity } from './infrastructure/entities/traslado_unidad.orm-entity';
import { TrasladoUnidadController } from './infrastructure/adapters/in/traslado_unidad.controller';
import { TrasladoUnidadTypeOrmRepository } from './infrastructure/adapters/out/traslado_unidad.typeorm-repository';
import { CrearTrasladoUnidadUseCase } from './application/use-cases/crear.use-case';
import { ObtenerTodosTrasladoUnidadUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdsTrasladoUnidadUseCase } from './application/use-cases/obtener-por-ids.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TrasladoUnidadOrmEntity])],
  controllers: [TrasladoUnidadController],
  providers: [
    CrearTrasladoUnidadUseCase,
    ObtenerTodosTrasladoUnidadUseCase,
    ObtenerPorIdsTrasladoUnidadUseCase,
    { provide: 'TrasladoUnidadRepository', useClass: TrasladoUnidadTypeOrmRepository },
  ],
})
export class TrasladoUnidadModule {}
