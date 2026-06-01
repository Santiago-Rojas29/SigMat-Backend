import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateSolicitudUseCase }      from '../../../application/use-cases/create-solicitud.use-case';
import { ActualizarSolicitudUseCase }  from '../../../application/use-cases/actualizar-solicitud.use-case';
import { EliminarSolicitudUseCase }    from '../../../application/use-cases/eliminar-solicitud.use-case';
import { ObtenerPorIdUseCase }         from '../../../application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase }         from '../../../application/use-cases/obtener-todos.use-case';
import { AprobarInstructorUseCase }    from '../../../application/use-cases/aprobar-instructor.use-case';
import { AprobarAdminUseCase }         from '../../../application/use-cases/aprobar-admin.use-case';
import { AprobarBodegaUseCase }        from '../../../application/use-cases/aprobar-bodega.use-case';
import { EntregarSolicitudUseCase }    from '../../../application/use-cases/entregar-solicitud.use-case';
import { RechazarSolicitudUseCase }    from '../../../application/use-cases/rechazar-solicitud.use-case';
import { CancelarSolicitudUseCase }    from '../../../application/use-cases/cancelar-solicitud.use-case';
import { CreateSolicitudDto }          from './dto/create-solicitud.dto';
import { UpdateSolicitudDto }          from './dto/update-solicitud.dto';
import { RechazarSolicitudDto }        from './dto/rechazar-solicitud.dto';
import { EntregarSolicitudDto }        from './dto/entregar-solicitud.dto';

@Controller('solicitud')
export class SolicitudController {
  constructor(
    private readonly createUseCase:           CreateSolicitudUseCase,
    private readonly actualizarUseCase:       ActualizarSolicitudUseCase,
    private readonly eliminarUseCase:         EliminarSolicitudUseCase,
    private readonly obtenerPorIdUseCase:     ObtenerPorIdUseCase,
    private readonly obtenerTodosUseCase:     ObtenerTodosUseCase,
    private readonly aprobarInstructorUC:     AprobarInstructorUseCase,
    private readonly aprobarAdminUC:          AprobarAdminUseCase,
    private readonly aprobarBodegaUC:         AprobarBodegaUseCase,
    private readonly entregarUC:              EntregarSolicitudUseCase,
    private readonly rechazarUC:              RechazarSolicitudUseCase,
    private readonly cancelarUC:              CancelarSolicitudUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateSolicitudDto) {
    return this.createUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.obtenerPorIdUseCase.execute(id);
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() body: UpdateSolicitudDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }

  // ── Transiciones de estado ────────────────────────────────────────────────

  @Patch(':id/aprobar-instructor')
  aprobarInstructor(@Param('id') id: string) {
    return this.aprobarInstructorUC.execute(id);
  }

  @Patch(':id/aprobar-admin')
  aprobarAdmin(@Param('id') id: string, @Body() body: { id_admin: string }) {
    return this.aprobarAdminUC.execute(id, body.id_admin);
  }

  @Patch(':id/aprobar-bodega')
  aprobarBodega(@Param('id') id: string, @Body() body: { id_bodega: string }) {
    return this.aprobarBodegaUC.execute(id, body.id_bodega);
  }

  @Patch(':id/entregar')
  entregar(@Param('id') id: string, @Body() body: EntregarSolicitudDto) {
    return this.entregarUC.execute(id, body);
  }

  @Patch(':id/rechazar')
  rechazar(@Param('id') id: string, @Body() body: RechazarSolicitudDto) {
    return this.rechazarUC.execute(id, body.rol, body.motivo_rechazo);
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id') id: string) {
    return this.cancelarUC.execute(id);
  }
}
