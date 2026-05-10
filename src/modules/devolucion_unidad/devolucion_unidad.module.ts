import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevolucionUnidadOrmEntity } from './infrastructure/entities/devolucion_unidad.orm-entity';
import { DevolucionUnidadController } from './infrastructure/adapters/in/devolucion_unidad.controller';
import { DevolucionUnidadTypeOrmRepository } from './infrastructure/adapters/out/devolucion_unidad.typeorm-repository';
import { CrearDevolucionUnidadUseCase } from './application/use-cases/crear.use-case';
import { ObtenerTodosDevolucionUnidadUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdsDevolucionUnidadUseCase } from './application/use-cases/obtener-por-ids.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([DevolucionUnidadOrmEntity])],
  controllers: [DevolucionUnidadController],
  providers: [
    CrearDevolucionUnidadUseCase,
    ObtenerTodosDevolucionUnidadUseCase,
    ObtenerPorIdsDevolucionUnidadUseCase,
    { provide: 'DevolucionUnidadRepository', useClass: DevolucionUnidadTypeOrmRepository },
  ],
})
export class DevolucionUnidadModule {}
