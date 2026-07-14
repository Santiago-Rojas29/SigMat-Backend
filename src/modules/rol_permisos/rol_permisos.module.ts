import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolPermisosOrmEntity }          from './infrastructure/entities/rol_permisos.orm-entity';
import { RolPermisosController }         from './infrastructure/adapters/in/rol_permisos.controller';
import { RolPermisosTypeOrmRepository }  from './infrastructure/adapters/out/rol_permisos.typeorm-repository';
import { AsignarRolPermisosUseCase }     from './application/use-cases/crear.use-case';
import { ObtenerTodosRolPermisosUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorRolUseCase }          from './application/use-cases/obtener-por-ids.use-case';
import { ActualizarRolPermisosUseCase }  from './application/use-cases/actualizar.use-case';
import { EliminarRolPermisosUseCase }    from './application/use-cases/eliminar.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([RolPermisosOrmEntity])],
  controllers: [RolPermisosController],
  providers: [
    AsignarRolPermisosUseCase,
    ObtenerTodosRolPermisosUseCase,
    ObtenerPorRolUseCase,
    ActualizarRolPermisosUseCase,
    EliminarRolPermisosUseCase,
    { provide: 'RolPermisosRepository', useClass: RolPermisosTypeOrmRepository },
  ],
  exports: ['RolPermisosRepository'],
})
export class RolPermisosModule {}
