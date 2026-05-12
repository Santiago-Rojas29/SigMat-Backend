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
import { CreateUbicacionUseCase } from '../../../application/use-cases/create-ubicacion.use-case';
import { ActualizarUbicacionUseCase } from '../../../application/use-cases/actualizar-ubicacion.use-case';
import { EliminarUbicacionUseCase } from '../../../application/use-cases/eliminar-ubicacion.use-case';
import { ObtenerPorIdUbicacionUseCase } from '../../../application/use-cases/obtener-por-id-ubicacion.use-case';
import { ObtenerTodosUbicacionUseCase } from '../../../application/use-cases/obtener-todos-ubicacion.use-case';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';

@Controller('ubicacion')
export class UbicacionController {
  constructor(
    private readonly createUseCase: CreateUbicacionUseCase,
    private readonly actualizarUseCase: ActualizarUbicacionUseCase,
    private readonly eliminarUseCase: EliminarUbicacionUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdUbicacionUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosUbicacionUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateUbicacionDto) {
    return this.createUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.obtenerPorIdUseCase.execute(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUbicacionDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarUseCase.execute(id);
  }
}
