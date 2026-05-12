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
import { CreateEntregaUseCase } from '../../../application/use-cases/create-entrega.use-case';
import { ActualizarEntregaUseCase } from '../../../application/use-cases/actualizar-entrega.use-case';
import { EliminarEntregaUseCase } from '../../../application/use-cases/eliminar-entrega.use-case';
import { ObtenerPorIdEntregaUseCase } from '../../../application/use-cases/obtener-por-id-entrega.use-case';
import { ObtenerTodosEntregaUseCase } from '../../../application/use-cases/obtener-todos-entrega.use-case';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';

@Controller('entrega')
export class EntregaController {
  constructor(
    private readonly createUseCase: CreateEntregaUseCase,
    private readonly actualizarUseCase: ActualizarEntregaUseCase,
    private readonly eliminarUseCase: EliminarEntregaUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdEntregaUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosEntregaUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateEntregaDto) {
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
    @Body() body: UpdateEntregaDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarUseCase.execute(id);
  }
}
