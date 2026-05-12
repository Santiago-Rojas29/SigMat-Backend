import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CrearDevolucionUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosDevolucionUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdDevoluvionUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarDevolucionUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarDevolucionUseCase } from '../../../application/use-cases/eliminar.use-case';
import { CrearDevolucionDto } from './dto/crear.dto';
import { ActualizarDevolucionDto } from './dto/actualizar.dto';

@Controller('devolucion')
export class DevolucionController {
  constructor(
    private readonly crearUseCase: CrearDevolucionUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosDevolucionUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdDevoluvionUseCase,
    private readonly actualizarUseCase: ActualizarDevolucionUseCase,
    private readonly eliminarUseCase: EliminarDevolucionUseCase,
  ) {}

  @Post()
  crear(@Body() body: CrearDevolucionDto) {
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
  actualizar(@Param('id') id: string, @Body() body: ActualizarDevolucionDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
