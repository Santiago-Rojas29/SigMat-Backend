import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CrearKardexUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosKardexUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdKardexUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarKardexUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarKardexUseCase } from '../../../application/use-cases/eliminar.use-case';
import { CrearKardexDto } from './dto/crear.dto';
import { ActualizarKardexDto } from './dto/actualizar.dto';

@Controller('kardex')
export class KardexController {
  constructor(
    private readonly crearUseCase: CrearKardexUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosKardexUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdKardexUseCase,
    private readonly actualizarUseCase: ActualizarKardexUseCase,
    private readonly eliminarUseCase: EliminarKardexUseCase,
  ) {}

  @Post()
  crear(@Body() body: CrearKardexDto) {
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
  actualizar(@Param('id') id: string, @Body() body: ActualizarKardexDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
