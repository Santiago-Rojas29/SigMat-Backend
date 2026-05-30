import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisosOrmEntity } from './infrastructure/entities/permisos.orm-entity';
import { PermisosController } from './infrastructure/adapters/in/permisos.controller';
import { PermisosTypeOrmRepository } from './infrastructure/adapters/out/permisos.typeorm-repository';
import { CrearPermisosUseCase } from './application/use-cases/crear.use-case';
import { ActualizarPermisosUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarPermisosUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerTodosPermisosUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdPermisosUseCase } from './application/use-cases/obtener-por-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PermisosOrmEntity])],
  controllers: [PermisosController],
  providers: [
    CrearPermisosUseCase,
    ActualizarPermisosUseCase,
    EliminarPermisosUseCase,
    ObtenerTodosPermisosUseCase,
    ObtenerPorIdPermisosUseCase,
    { provide: 'PermisosRepository', useClass: PermisosTypeOrmRepository },
  ],
})
export class PermisosModule {}
