import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevolucionOrmEntity } from './infrastructure/entities/devolucion.orm-entity';
import { DevolucionController } from './infrastructure/adapters/in/devolucion.controller';
import { DevolucionTypeOrmRepository } from './infrastructure/adapters/out/devolucion.typeorm-repository';
import { CrearDevolucionUseCase } from './application/use-cases/crear.use-case';
import { ActualizarDevolucionUseCase } from './application/use-cases/actualizar.use-case';
import { EliminarDevolucionUseCase } from './application/use-cases/eliminar.use-case';
import { ObtenerTodosDevolucionUseCase } from './application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdDevolucionUseCase } from './application/use-cases/obtener-por-id.use-case';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';
import { KardexAutoService }    from '../kardex/application/services/kardex-auto.service';

@Module({
  imports: [TypeOrmModule.forFeature([DevolucionOrmEntity]), NotificacionesModule],
  controllers: [DevolucionController],
  providers: [
    CrearDevolucionUseCase,
    ActualizarDevolucionUseCase,
    EliminarDevolucionUseCase,
    ObtenerTodosDevolucionUseCase,
    ObtenerPorIdDevolucionUseCase,
    KardexAutoService,
    { provide: 'DevolucionRepository', useClass: DevolucionTypeOrmRepository },
  ],
})
export class DevolucionModule {}
