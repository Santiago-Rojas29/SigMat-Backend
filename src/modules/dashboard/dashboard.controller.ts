import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats() {
    return this.dashboardService.getStats();
  }

  @Get('solicitudes-mes')
  getSolicitudesMes(@Query('anio') anio: string) {
    const year = Number(anio) || new Date().getFullYear();
    return this.dashboardService.getSolicitudesPorAnio(year);
  }

  @Get('solicitudes-dia')
  getSolicitudesDia(@Query('anio') anio: string, @Query('mes') mes: string) {
    const year  = Number(anio) || new Date().getFullYear();
    const month = Number(mes)  || new Date().getMonth() + 1;
    return this.dashboardService.getSolicitudesPorDia(year, month);
  }
}
