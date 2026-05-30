import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregaOrmEntity } from './infrastructure/entities/entrega.orm-entity';
import { EntregaTypeOrmRepository } from './infrastructure/adapters/out/entrega.typeorm-repository';
import { EntregaController } from './infrastructure/adapters/in/entrega.controller';
import { CreateEntregaUseCase } from './application/use-cases/create-entrega.use-case';
import { ActualizarEntregaUseCase } from './application/use-cases/actualizar-entrega.use-case';
import { EliminarEntregaUseCase } from './application/use-cases/eliminar-entrega.use-case';
import { ObtenerPorIdEntregaUseCase } from './application/use-cases/obtener-por-id-entrega.use-case';
import { ObtenerTodosEntregaUseCase } from './application/use-cases/obtener-todos-entrega.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([EntregaOrmEntity])],
  controllers: [EntregaController],
  providers: [
    CreateEntregaUseCase,
    ActualizarEntregaUseCase,
    EliminarEntregaUseCase,
    ObtenerPorIdEntregaUseCase,
    ObtenerTodosEntregaUseCase,
    {
      provide: 'EntregaRepository',
      useClass: EntregaTypeOrmRepository,
    },
  ],
})
export class EntregaModule {}
