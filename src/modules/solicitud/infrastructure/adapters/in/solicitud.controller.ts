import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateSolicitudUseCase } from '../../../application/use-cases/create-solicitud.use-case';
import { ActualizarSolicitudUseCase } from '../../../application/use-cases/actualizar-solicitud.use-case';
import { EliminarSolicitudUseCase } from '../../../application/use-cases/eliminar-solicitud.use-case';
import { ObtenerPorIdUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';

@Controller('solicitud')
export class SolicitudController {
  constructor(
    private readonly createUseCase: CreateSolicitudUseCase,
    private readonly actualizarUseCase: ActualizarSolicitudUseCase,
    private readonly eliminarUseCase: EliminarSolicitudUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosUseCase,
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
  actualizar(
    @Param('id') id: string,
    @Body() body: UpdateSolicitudDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
