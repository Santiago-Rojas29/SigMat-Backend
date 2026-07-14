import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SesionWhatsappOrmEntity } from './infrastructure/entities/sesion-whatsapp.orm-entity';
import { SesionWhatsappController } from './infrastructure/adapters/in/sesion-whatsapp.controller';
import { SesionWhatsappTypeOrmRepository } from './infrastructure/adapters/out/sesion-whatsapp.typeorm-repository';
import { ObtenerSesionPorTelefonoUseCase } from './application/use-cases/obtener-por-telefono.use-case';
import { UpsertSesionWhatsappUseCase } from './application/use-cases/upsert.use-case';
import { EliminarSesionWhatsappUseCase } from './application/use-cases/eliminar.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SesionWhatsappOrmEntity])],
  controllers: [SesionWhatsappController],
  providers: [
    ObtenerSesionPorTelefonoUseCase,
    UpsertSesionWhatsappUseCase,
    EliminarSesionWhatsappUseCase,
    { provide: 'SesionWhatsappRepository', useClass: SesionWhatsappTypeOrmRepository },
  ],
})
export class SesionWhatsappModule {}
