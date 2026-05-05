import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreatePrestamoUseCase } from '../../../application/use-cases/crear.use-case';
import { ActualizarPrestamoUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarPrestamoUseCase } from '../../../application/use-cases/eliminar.use-case';
import { ObtenerPorIdUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { CreatePrestamoDto } from './dto/crear.dto';
import { UpdatePrestamoDto } from './dto/actualizar.dto';

@Controller('prestamo')
export class PrestamoController {
  constructor(
    private readonly createUseCase: CreatePrestamoUseCase,
    private readonly actualizarUseCase: ActualizarPrestamoUseCase,
    private readonly eliminarUseCase: EliminarPrestamoUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreatePrestamoDto) {
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
  actualizar(@Param('id') id: string, @Body() body: UpdatePrestamoDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
