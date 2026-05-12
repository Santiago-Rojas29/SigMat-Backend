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
import { CreateSedeUseCase } from '../../../application/use-cases/create-sede.use-case';
import { ActualizarSedeUseCase } from '../../../application/use-cases/actualizar-sede.use-case';
import { EliminarSedeUseCase } from '../../../application/use-cases/eliminar-sede.use-case';
import { ObtenerPorIdSedeUseCase } from '../../../application/use-cases/obtener-por-id-sede.use-case';
import { ObtenerTodosSedeUseCase } from '../../../application/use-cases/obtener-todos-sede.use-case';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';

@Controller('sede')
export class SedeController {
  constructor(
    private readonly createUseCase: CreateSedeUseCase,
    private readonly actualizarUseCase: ActualizarSedeUseCase,
    private readonly eliminarUseCase: EliminarSedeUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdSedeUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosSedeUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateSedeDto) {
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
    @Body() body: UpdateSedeDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarUseCase.execute(id);
  }
}
