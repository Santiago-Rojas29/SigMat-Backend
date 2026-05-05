import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateValidacionUseCase } from '../../../application/use-cases/create-validacion.use-case';
import { ActualizarValidacionUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarValidacionUseCase } from '../../../application/use-cases/eliminar.use-case';
import { ObtenerValidacionPorIdUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosValidacionUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { CreateValidacionDto } from './dto/create-validacion.dto';
import { UpdateValidacionDto } from './dto/update-validacion.dto';

@Controller('validacion')
export class ValidacionController {
  constructor(
    private readonly createUseCase: CreateValidacionUseCase,
    private readonly actualizarUseCase: ActualizarValidacionUseCase,
    private readonly eliminarUseCase: EliminarValidacionUseCase,
    private readonly obtenerPorIdUseCase: ObtenerValidacionPorIdUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosValidacionUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateValidacionDto) {
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
  actualizar(@Param('id') id: string, @Body() body: UpdateValidacionDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
