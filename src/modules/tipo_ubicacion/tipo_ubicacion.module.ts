import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUbicacionOrmEntity } from './infrastructure/entities/tipo_ubicacion.orm-entity';
import { TipoUbicacionTypeOrmRepository } from './infrastructure/adapters/out/tipo_ubicacion.typeorm-repository';
import { TipoUbicacionController } from './infrastructure/adapters/in/tipo_ubicacion.controller';
import { CreateTipoUbicacionUseCase } from './application/use-cases/create-tipo-ubicacion.use-case';
import { ActualizarTipoUbicacionUseCase } from './application/use-cases/actualizar-tipo-ubicacion.use-case';
import { EliminarTipoUbicacionUseCase } from './application/use-cases/eliminar-tipo-ubicacion.use-case';
import { ObtenerPorIdTipoUbicacionUseCase } from './application/use-cases/obtener-por-id-tipo-ubicacion.use-case';
import { ObtenerTodosTipoUbicacionUseCase } from './application/use-cases/obtener-todos-tipo-ubicacion.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TipoUbicacionOrmEntity])],
  controllers: [TipoUbicacionController],
  providers: [
    CreateTipoUbicacionUseCase,
    ActualizarTipoUbicacionUseCase,
    EliminarTipoUbicacionUseCase,
    ObtenerPorIdTipoUbicacionUseCase,
    ObtenerTodosTipoUbicacionUseCase,
    {
      provide: 'TipoUbicacionRepository',
      useClass: TipoUbicacionTypeOrmRepository,
    },
  ],
})
export class TipoUbicacionModule {}
