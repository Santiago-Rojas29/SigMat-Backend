import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KardexOrmEntity } from './infrastructure/entities/kardex.orm-entity';
import { KardexController } from './infrastructure/adapters/in/kardex.controller';
import { KardexTypeOrmRepository } from './infrastructure/adapters/out/kardex.typeorm-repository';
import { CrearKardexUseCase } from './application/use-cases/crear.use-case';
import { ActualizarKardexUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarKardexUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerTodosKardexUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdKardexUseCase } from './application/use-cases/obtener-por-id.use-case';
import { KardexAutoService } from './application/services/kardex-auto.service';

@Module({
  imports: [TypeOrmModule.forFeature([KardexOrmEntity])],
  controllers: [KardexController],
  providers: [
    CrearKardexUseCase,
    ActualizarKardexUseCase,
    EliminarKardexUseCase,
    ObtenerTodosKardexUseCase,
    ObtenerPorIdKardexUseCase,
    KardexAutoService,
    { provide: 'KardexRepository', useClass: KardexTypeOrmRepository },
  ],
  exports: [KardexAutoService],
})
export class KardexModule {}
