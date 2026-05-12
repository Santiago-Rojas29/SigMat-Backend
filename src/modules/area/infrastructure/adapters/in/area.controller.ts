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
import { CreateAreaUseCase } from '../../../application/use-cases/create-area.use-case';
import { ActualizarAreaUseCase } from '../../../application/use-cases/actualizar-area.use-case';
import { EliminarAreaUseCase } from '../../../application/use-cases/eliminar-area.use-case';
import { ObtenerPorIdAreaUseCase } from '../../../application/use-cases/obtener-por-id-area.use-case';
import { ObtenerTodosAreaUseCase } from '../../../application/use-cases/obtener-todos-area.use-case';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Controller('area')
export class AreaController {
  constructor(
    private readonly createUseCase: CreateAreaUseCase,
    private readonly actualizarUseCase: ActualizarAreaUseCase,
    private readonly eliminarUseCase: EliminarAreaUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdAreaUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosAreaUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateAreaDto) {
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
    @Body() body: UpdateAreaDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarUseCase.execute(id);
  }
}
