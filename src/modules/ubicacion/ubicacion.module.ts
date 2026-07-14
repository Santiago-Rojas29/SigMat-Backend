import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicacionOrmEntity } from './infrastructure/entities/ubicacion.orm-entity';
import { UbicacionTypeOrmRepository } from './infrastructure/adapters/out/ubicacion.typeorm-repository';
import { UbicacionController } from './infrastructure/adapters/in/ubicacion.controller';
import { CreateUbicacionUseCase } from './application/use-cases/create-ubicacion.use-case';
import { ActualizarUbicacionUseCase } from './application/use-cases/actualizar-ubicacion.use-case';
import { EliminarUbicacionUseCase } from './application/use-cases/eliminar-ubicacion.use-case';
import { ObtenerPorIdUbicacionUseCase } from './application/use-cases/obtener-por-id-ubicacion.use-case';
import { ObtenerTodosUbicacionUseCase } from './application/use-cases/obtener-todos-ubicacion.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UbicacionOrmEntity])],
  controllers: [UbicacionController],
  providers: [
    CreateUbicacionUseCase,
    ActualizarUbicacionUseCase,
    EliminarUbicacionUseCase,
    ObtenerPorIdUbicacionUseCase,
    ObtenerTodosUbicacionUseCase,
    {
      provide: 'UbicacionRepository',
      useClass: UbicacionTypeOrmRepository,
    },
  ],
})
export class UbicacionModule {}
