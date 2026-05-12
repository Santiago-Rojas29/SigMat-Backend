import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaUsuarioOrmEntity } from './infrastructure/entities/ficha_usuario.orm-entity';
import { FichaUsuarioTypeOrmRepository } from './infrastructure/adapters/out/ficha_usuario.typeorm-repository';
import { FichaUsuarioController } from './infrastructure/adapters/in/ficha_usuario.controller';
import { CreateFichaUsuarioUseCase } from './application/use-cases/create-ficha-usuario.use-case';
import { ActualizarFichaUsuarioUseCase } from './application/use-cases/actualizar-ficha-usuario.use-case';
import { EliminarFichaUsuarioUseCase } from './application/use-cases/eliminar-ficha-usuario.use-case';
import { ObtenerPorIdFichaUsuarioUseCase } from './application/use-cases/obtener-por-id-ficha-usuario.use-case';
import { ObtenerTodosFichaUsuarioUseCase } from './application/use-cases/obtener-todos-ficha-usuario.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([FichaUsuarioOrmEntity])],
  controllers: [FichaUsuarioController],
  providers: [
    CreateFichaUsuarioUseCase,
    ActualizarFichaUsuarioUseCase,
    EliminarFichaUsuarioUseCase,
    ObtenerPorIdFichaUsuarioUseCase,
    ObtenerTodosFichaUsuarioUseCase,
    {
      provide: 'FichaUsuarioRepository',
      useClass: FichaUsuarioTypeOrmRepository,
    },
  ],
})
export class FichaUsuarioModule {}
