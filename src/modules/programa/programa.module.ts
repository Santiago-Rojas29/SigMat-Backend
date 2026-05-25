import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaOrmEntity } from './infrastructure/entities/programa.orm-entity';
import { ProgramaTypeOrmRepository } from './infrastructure/adapters/out/programa.typeorm-repository';
import { ProgramaController } from './infrastructure/adapters/in/programa.controller';
import { CreateProgramaUseCase } from './application/use-cases/create-programa.use-case';
import { ActualizarProgramaUseCase } from './application/use-cases/actualizar-programa.use-case';
import { EliminarProgramaUseCase } from './application/use-cases/eliminar-programa.use-case';
import { ObtenerPorIdProgramaUseCase } from './application/use-cases/obtener-por-id-programa.use-case';
import { ObtenerTodosProgramaUseCase } from './application/use-cases/obtener-todos-programa.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaOrmEntity])],
  controllers: [ProgramaController],
  providers: [
    CreateProgramaUseCase,
    ActualizarProgramaUseCase,
    EliminarProgramaUseCase,
    ObtenerPorIdProgramaUseCase,
    ObtenerTodosProgramaUseCase,
    {
      provide: 'ProgramaRepository',
      useClass: ProgramaTypeOrmRepository,
    },
  ],
})
export class ProgramaModule {}
