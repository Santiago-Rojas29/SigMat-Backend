import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolOrmEntity } from './infrastructure/entities/rol.orm-entity';
import { RolController } from './infrastructure/adapters/in/rol.controller';
import { RolTypeOrmRepository } from './infrastructure/adapters/out/rol.typeorm-repository';
import { CrearRolUseCase } from './application/use-cases/crear.use-case';
import { ActualizarRolUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarRolUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerTodosRolUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdRolUseCase } from './application/use-cases/obtener-por-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([RolOrmEntity])],
  controllers: [RolController],
  providers: [
    CrearRolUseCase,
    ActualizarRolUseCase,
    EliminarRolUseCase,
    ObtenerTodosRolUseCase,
    ObtenerPorIdRolUseCase,
    { provide: 'RolRepository', useClass: RolTypeOrmRepository },
  ],
})
export class RolModule {}
