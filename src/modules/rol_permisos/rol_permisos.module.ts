import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolPermisosOrmEntity } from './infrastructure/entities/rol_permisos.orm-entity';
import { RolPermisosController } from './infrastructure/adapters/in/rol_permisos.controller';
import { RolPermisosTypeOrmRepository } from './infrastructure/adapters/out/rol_permisos.typeorm-repository';
import { CrearRolPermisosUseCase } from './application/use-cases/crear.use-case';
import { ObtenerTodosRolPermisosUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdsRolPermisosUseCase } from './application/use-cases/obtener-por-ids.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([RolPermisosOrmEntity])],
  controllers: [RolPermisosController],
  providers: [
    CrearRolPermisosUseCase,
    ObtenerTodosRolPermisosUseCase,
    ObtenerPorIdsRolPermisosUseCase,
    { provide: 'RolPermisosRepository', useClass: RolPermisosTypeOrmRepository },
  ],
})
export class RolPermisosModule {}
