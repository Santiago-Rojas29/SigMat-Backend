import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateProgramaUseCase } from '../../../application/use-cases/create-programa.use-case';
import { ActualizarProgramaUseCase } from '../../../application/use-cases/actualizar-programa.use-case';
import { EliminarProgramaUseCase } from '../../../application/use-cases/eliminar-programa.use-case';
import { ObtenerPorIdProgramaUseCase } from '../../../application/use-cases/obtener-por-id-programa.use-case';
import { ObtenerTodosProgramaUseCase } from '../../../application/use-cases/obtener-todos-programa.use-case';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@Controller('programa')
export class ProgramaController {
  constructor(
    private readonly createUseCase: CreateProgramaUseCase,
    private readonly actualizarUseCase: ActualizarProgramaUseCase,
    private readonly eliminarUseCase: EliminarProgramaUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdProgramaUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosProgramaUseCase,
  ) { }

  @Post()
  crear(@Body() body: CreateProgramaDto) {
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
  actualizar(
    @Param('id') id: string,
    @Body() body: UpdateProgramaDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
