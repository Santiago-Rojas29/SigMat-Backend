import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CrearIncidenciaUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosIncidenciaUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdIncidenciaUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarIncidenciaUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarIncidenciaUseCase } from '../../../application/use-cases/eliminar.use-case';
import { CrearIncidenciaDto } from './dto/crear.dto';
import { ActualizarIncidenciaDto } from './dto/actualizar.dto';

@Controller('incidencia')
export class IncidenciaController {
  constructor(
    private readonly crearUseCase: CrearIncidenciaUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosIncidenciaUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdIncidenciaUseCase,
    private readonly actualizarUseCase: ActualizarIncidenciaUseCase,
    private readonly eliminarUseCase: EliminarIncidenciaUseCase,
  ) {}

  @Post()
  crear(@Body() body: CrearIncidenciaDto) {
    return this.crearUseCase.execute(body);
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
  actualizar(@Param('id') id: string, @Body() body: ActualizarIncidenciaDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
