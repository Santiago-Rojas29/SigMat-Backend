import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioPermisosOrmEntity } from './infrastructure/entities/usuario_permisos.orm-entity';
import { UsuarioPermisosTypeOrmRepository } from './infrastructure/adapters/out/usuario_permisos.typeorm-repository';
import { UsuarioPermisosController } from './infrastructure/adapters/in/usuario_permisos.controller';

import { AsignarUsuarioPermisosUseCase } from './application/use-cases/asignar.use-case';
import { RevocarUsuarioPermisosUseCase } from './application/use-cases/revocar.use-case';
import { RevocarTodosPermisosUseCase } from './application/use-cases/revocar-todos.use-case';
import { ObtenerPermisosDeUsuarioUseCase } from './application/use-cases/obtener-por-usuario.use-case';
import { ActualizarSubmodulosUseCase } from './application/use-cases/actualizar-submodulos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioPermisosOrmEntity])],
  controllers: [UsuarioPermisosController],
  providers: [
    AsignarUsuarioPermisosUseCase,
    RevocarUsuarioPermisosUseCase,
    RevocarTodosPermisosUseCase,
    ObtenerPermisosDeUsuarioUseCase,
    ActualizarSubmodulosUseCase,
    {
      provide: 'UsuarioPermisosRepository',
      useClass: UsuarioPermisosTypeOrmRepository,
    },
  ],
  exports: ['UsuarioPermisosRepository'],
})
export class UsuarioPermisosModule {}
