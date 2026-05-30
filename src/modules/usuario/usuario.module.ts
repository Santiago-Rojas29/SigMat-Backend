import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioOrmEntity } from './infrastructure/entities/usuario.orm-entity';
import { UsuarioController } from './infrastructure/adapters/in/usuario.controller';
import { UsuarioTypeOrmRepository } from './infrastructure/adapters/out/usuario.typeorm-repository';
import { CrearUsuarioUseCase } from './application/use-cases/crear.use-case';
import { ActualizarUsuarioUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarUsuarioUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerTodosUsuarioUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdUsuarioUseCase } from './application/use-cases/obtener-por-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioOrmEntity])],
  controllers: [UsuarioController],
  providers: [
    CrearUsuarioUseCase,
    ActualizarUsuarioUseCase,
    EliminarUsuarioUseCase,
    ObtenerTodosUsuarioUseCase,
    ObtenerPorIdUsuarioUseCase,
    { provide: 'UsuarioRepository', useClass: UsuarioTypeOrmRepository },
  ],
})
export class UsuarioModule {}
