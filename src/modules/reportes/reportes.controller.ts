import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ReportesService } from './reportes.service';

@Controller('reportes')
@UseGuards(JwtAuthGuard)
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('solicitudes')
  getSolicitudes(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('estado') estado?: string,
    @Query('tipo_flujo') tipo_flujo?: string,
  ) {
    return this.reportesService.getSolicitudes({ desde, hasta, estado, tipo_flujo });
  }

  @Get('stock-critico')
  getStockCritico(@Query('umbral') umbral?: string) {
    return this.reportesService.getStockCritico(Number(umbral) || 25);
  }

  @Get('lotes-vencimiento')
  getLotesVencimiento(@Query('dias') dias?: string) {
    return this.reportesService.getLotesVencimiento(Number(dias) || 30);
  }

  @Get('morosos')
  getMorosos() {
    return this.reportesService.getMorosos();
  }

  @Get('kardex')
  getKardex(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('tipo_movimiento') tipo_movimiento?: string,
  ) {
    return this.reportesService.getKardex({ desde, hasta, tipo_movimiento });
  }

  @Get('incidencias')
  getIncidencias(
    @Query('estado') estado?: string,
    @Query('tipo') tipo?: string,
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
  ) {
    return this.reportesService.getIncidencias({ estado, tipo, desde, hasta });
  }

  @Get('resumen')
  getResumen(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
  ) {
    return this.reportesService.getResumen({ desde, hasta });
  }
}
