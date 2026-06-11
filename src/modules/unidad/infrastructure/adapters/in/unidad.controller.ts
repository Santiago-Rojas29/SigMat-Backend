import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUnidadUseCase } from '../../../application/use-cases/create-unidad.use-case';
import { ActualizarUnidadUseCase } from '../../../application/use-cases/actualizar-unidad.use-case';
import { EliminarUnidadUseCase } from '../../../application/use-cases/eliminar-unidad.use-case';
import { ObtenerPorIdUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerUnidadesPorUbicacionUseCase } from '../../../application/use-cases/obtener-por-ubicacion.use-case';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';

@Controller('unidad')
export class UnidadController {
  constructor(
    private readonly createUseCase: CreateUnidadUseCase,
    private readonly actualizarUseCase: ActualizarUnidadUseCase,
    private readonly eliminarUseCase: EliminarUnidadUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosUseCase,
    private readonly obtenerPorUbicacionUseCase: ObtenerUnidadesPorUbicacionUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateUnidadDto) {
    return this.createUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get('por-ubicacion/:id')
  obtenerPorUbicacion(@Param('id') id: string) {
    return this.obtenerPorUbicacionUseCase.execute(id);
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.obtenerPorIdUseCase.execute(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id') id: string,
    @Body() body: UpdateUnidadDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
