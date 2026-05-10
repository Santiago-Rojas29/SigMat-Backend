import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CrearTrasladoUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosTrasladoUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdTrasladoUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarTrasladoUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarTrasladoUseCase } from '../../../application/use-cases/eliminar.use-case';
import { CrearTrasladoDto } from './dto/crear.dto';
import { ActualizarTrasladoDto } from './dto/actualizar.dto';

@Controller('traslado')
export class TrasladoController {
  constructor(
    private readonly crearUseCase: CrearTrasladoUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosTrasladoUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdTrasladoUseCase,
    private readonly actualizarUseCase: ActualizarTrasladoUseCase,
    private readonly eliminarUseCase: EliminarTrasladoUseCase,
  ) {}

  @Post()
  crear(@Body() body: CrearTrasladoDto) {
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
  actualizar(@Param('id') id: string, @Body() body: ActualizarTrasladoDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
