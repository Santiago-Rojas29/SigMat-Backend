import { Controller, Get, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { NotificacionesService } from './notificaciones.service';

@UseGuards(JwtAuthGuard)
@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly service: NotificacionesService) {}

  @Get()
  listar(@Req() req: any) {
    return this.service.listarPorUsuario(req.user.id);
  }

  @Get('no-leidas')
  async contarNoLeidas(@Req() req: any) {
    const count = await this.service.contarNoLeidas(req.user.id);
    return { count };
  }

  @Patch('leer-todas')
  async marcarTodasLeidas(@Req() req: any) {
    await this.service.marcarTodasLeidas(req.user.id);
    return { ok: true };
  }

  @Patch(':id/leer')
  async marcarLeida(@Param('id') id: string, @Req() req: any) {
    await this.service.marcarLeida(id, req.user.id);
    return { ok: true };
  }
}
