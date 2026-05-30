import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialOrmEntity } from './infrastructure/entities/material.orm-entity';
import { MaterialController } from './infrastructure/adapters/in/material.controller';
import { MaterialTypeOrmRepository } from './infrastructure/adapters/out/material.typeorm-repository';
import { CrearMaterialUseCase } from './application/use-cases/crear.use-case';
import { ActualizarMaterialUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarMaterialUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerTodosMaterialUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdMaterialUseCase } from './application/use-cases/obtener-por-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialOrmEntity])],
  controllers: [MaterialController],
  providers: [
    CrearMaterialUseCase,
    ActualizarMaterialUseCase,
    EliminarMaterialUseCase,
    ObtenerTodosMaterialUseCase,
    ObtenerPorIdMaterialUseCase,
    { provide: 'MaterialRepository', useClass: MaterialTypeOrmRepository },
  ],
})
export class MaterialModule {}
