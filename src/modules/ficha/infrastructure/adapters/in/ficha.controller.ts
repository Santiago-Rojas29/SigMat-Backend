import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateFichaUseCase } from '../../../application/use-cases/create-ficha.use-case';
import { ActualizarFichaUseCase } from '../../../application/use-cases/actualizar-ficha.use-case';
import { EliminarFichaUseCase } from '../../../application/use-cases/eliminar-ficha.use-case';
import { ObtenerPorIdFichaUseCase } from '../../../application/use-cases/obtener-por-id-ficha.use-case';
import { ObtenerTodosFichaUseCase } from '../../../application/use-cases/obtener-todos-ficha.use-case';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';

@Controller('ficha')
export class FichaController {
  constructor(
    private readonly createUseCase: CreateFichaUseCase,
    private readonly actualizarUseCase: ActualizarFichaUseCase,
    private readonly eliminarUseCase: EliminarFichaUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdFichaUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosFichaUseCase,
  ) { }

  @Post()
  crear(@Body() body: CreateFichaDto) {
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
    @Body() body: UpdateFichaDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
