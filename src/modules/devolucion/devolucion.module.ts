import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevolucionOrmEntity } from './infrastructure/entities/devolucion.orm-entity';
import { DevolucionController } from './infrastructure/adapters/in/devolucion.controller';
import { DevolucionTypeOrmRepository } from './infrastructure/adapters/out/devolucion.typeorm-repository';
import { CrearDevolucionUseCase } from './application/use-cases/crear.use-case';
import { ActualizarDevolucionUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarDevolucionUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerTodosDevolucionUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdDevoluvionUseCase } from './application/use-cases/obtener-por-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([DevolucionOrmEntity])],
  controllers: [DevolucionController],
  providers: [
    CrearDevolucionUseCase,
    ActualizarDevolucionUseCase,
    EliminarDevolucionUseCase,
    ObtenerTodosDevolucionUseCase,
    ObtenerPorIdDevoluvionUseCase,
    { provide: 'DevolucionRepository', useClass: DevolucionTypeOrmRepository },
  ],
})
export class DevolucionModule {}
