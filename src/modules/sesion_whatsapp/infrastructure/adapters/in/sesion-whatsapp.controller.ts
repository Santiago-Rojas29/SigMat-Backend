import { Body, Controller, Delete, Get, HttpCode, Param, Put } from '@nestjs/common';
import { ObtenerSesionPorTelefonoUseCase } from '../../../application/use-cases/obtener-por-telefono.use-case';
import { UpsertSesionWhatsappUseCase } from '../../../application/use-cases/upsert.use-case';
import { EliminarSesionWhatsappUseCase } from '../../../application/use-cases/eliminar.use-case';
import { UpsertSesionWhatsappDto } from './dto/upsert-sesion-whatsapp.dto';

@Controller('sesion-whatsapp')
export class SesionWhatsappController {
  constructor(
    private readonly obtenerUseCase: ObtenerSesionPorTelefonoUseCase,
    private readonly upsertUseCase: UpsertSesionWhatsappUseCase,
    private readonly eliminarUseCase: EliminarSesionWhatsappUseCase,
  ) {}

  @Get(':telefono')
  obtener(@Param('telefono') telefono: string) {
    return this.obtenerUseCase.execute(telefono);
  }

  @Put(':telefono')
  upsert(@Param('telefono') telefono: string, @Body() body: UpsertSesionWhatsappDto) {
    return this.upsertUseCase.execute(telefono, body);
  }

  @Delete(':telefono')
  @HttpCode(204)
  async eliminar(@Param('telefono') telefono: string): Promise<void> {
    await this.eliminarUseCase.execute(telefono);
  }
}
