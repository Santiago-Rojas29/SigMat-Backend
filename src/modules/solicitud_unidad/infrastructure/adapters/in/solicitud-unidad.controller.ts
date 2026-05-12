import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateSolicitudUnidadUseCase } from '../../../application/use-cases/create-solicitud-unidad.use-case';
import { ActualizarSolicitudUnidadUseCase } from '../../../application/use-cases/actualizar-solicitud-unidad.use-case';
import { EliminarSolicitudUnidadUseCase } from '../../../application/use-cases/eliminar-solicitud-unidad.use-case';
import { ObtenerPorIdUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { CreateSolicitudUnidadDto } from './dto/create-solicitud-unidad.dto';
import { UpdateSolicitudUnidadDto } from './dto/update-solicitud-unidad.dto';

@Controller('solicitud-unidad')
export class SolicitudUnidadController {
  constructor(
    private readonly createUseCase: CreateSolicitudUnidadUseCase,
    private readonly actualizarUseCase: ActualizarSolicitudUnidadUseCase,
    private readonly eliminarUseCase: EliminarSolicitudUnidadUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateSolicitudUnidadDto) {
    return this.createUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get(':id_solicitud/:id_unidad')
  obtenerPorId(
    @Param('id_solicitud', ParseIntPipe) id_solicitud: number,
    @Param('id_unidad', ParseIntPipe) id_unidad: number,
  ) {
    return this.obtenerPorIdUseCase.execute(id_solicitud, id_unidad);
  }

  @Patch(':id_solicitud/:id_unidad')
  actualizar(
    @Param('id_solicitud', ParseIntPipe) id_solicitud: number,
    @Param('id_unidad', ParseIntPipe) id_unidad: number,
    @Body() body: UpdateSolicitudUnidadDto,
  ) {
    return this.actualizarUseCase.execute(id_solicitud, id_unidad, body);
  }

  @Delete(':id_solicitud/:id_unidad')
  eliminar(
    @Param('id_solicitud', ParseIntPipe) id_solicitud: number,
    @Param('id_unidad', ParseIntPipe) id_unidad: number,
  ) {
    return this.eliminarUseCase.execute(id_solicitud, id_unidad);
  }
}
