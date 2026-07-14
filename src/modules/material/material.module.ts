import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialOrmEntity } from './infrastructure/entities/material.orm-entity';
import { LoteOrmEntity } from '../lote/infrastructure/entities/lote.orm-entity';
import { UnidadOrmEntity } from '../unidad/infrastructure/entities/unidad.orm-entity';
import { MaterialController } from './infrastructure/adapters/in/material.controller';
import { MaterialTypeOrmRepository } from './infrastructure/adapters/out/material.typeorm-repository';
import { CrearMaterialUseCase } from './application/use-cases/crear.use-case';
import { ActualizarMaterialUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarMaterialUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerTodosMaterialUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdMaterialUseCase } from './application/use-cases/obtener-por-id.use-case';
import { ImportarMaterialesUseCase } from './application/use-cases/importar-materiales.use-case';
import { CatalogoMaterialesUseCase } from './application/use-cases/catalogo-materiales.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialOrmEntity, LoteOrmEntity, UnidadOrmEntity])],
  controllers: [MaterialController],
  providers: [
    CrearMaterialUseCase,
    ActualizarMaterialUseCase,
    EliminarMaterialUseCase,
    ObtenerTodosMaterialUseCase,
    ObtenerPorIdMaterialUseCase,
    ImportarMaterialesUseCase,
    CatalogoMaterialesUseCase,
    { provide: 'MaterialRepository', useClass: MaterialTypeOrmRepository },
  ],
})
export class MaterialModule {}
