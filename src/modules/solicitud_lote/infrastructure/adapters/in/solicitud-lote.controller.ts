import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateSolicitudLoteUseCase } from '../../../application/use-cases/create-solicitud-lote.use-case';
import { ActualizarSolicitudLoteUseCase } from '../../../application/use-cases/actualizar-solicitud-lote.use-case';
import { EliminarSolicitudLoteUseCase } from '../../../application/use-cases/eliminar-solicitud-lote.use-case';
import { ObtenerPorIdUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { CreateSolicitudLoteDto } from './dto/create-solicitud-lote.dto';
import { UpdateSolicitudLoteDto } from './dto/update-solicitud-lote.dto';

@Controller('solicitud-lote')
export class SolicitudLoteController {
  constructor(
    private readonly createUseCase: CreateSolicitudLoteUseCase,
    private readonly actualizarUseCase: ActualizarSolicitudLoteUseCase,
    private readonly eliminarUseCase: EliminarSolicitudLoteUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateSolicitudLoteDto) {
    return this.createUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get(':id_solicitud/:id_lote')
  obtenerPorId(
    @Param('id_solicitud') id_solicitud: string,
    @Param('id_lote') id_lote: string,
  ) {
    return this.obtenerPorIdUseCase.execute(id_solicitud, id_lote);
  }

  @Patch(':id_solicitud/:id_lote')
  actualizar(
    @Param('id_solicitud') id_solicitud: string,
    @Param('id_lote') id_lote: string,
    @Body() body: UpdateSolicitudLoteDto,
  ) {
    return this.actualizarUseCase.execute(id_solicitud, id_lote, body);
  }

  @Delete(':id_solicitud/:id_lote')
  eliminar(
    @Param('id_solicitud') id_solicitud: string,
    @Param('id_lote') id_lote: string,
  ) {
    return this.eliminarUseCase.execute(id_solicitud, id_lote);
  }
}
