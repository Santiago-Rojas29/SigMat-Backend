import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { CreateCentroUseCase } from '../../../application/use-cases/create-centro.use-case';
import { ActualizarCentroUseCase } from '../../../application/use-cases/actualizar-centro.use-case';
import { EliminarCentroUseCase } from '../../../application/use-cases/eliminar-centro.use-case';
import { ObtenerPorIdUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { CreateCentroDto } from './dto/create-centro.dto';
import { UpdateCentroDto } from './dto/update-centro.dto';

@Controller('centro')
export class CentroController {
  constructor(
    private readonly createUseCase: CreateCentroUseCase,
    private readonly updateUseCase: ActualizarCentroUseCase,
    private readonly deleteUseCase: EliminarCentroUseCase,
    private readonly getByIdUseCase: ObtenerPorIdUseCase,
    private readonly getAllUseCase: ObtenerTodosUseCase,
  ) {}

  @Post()
  create(@Body() body: CreateCentroDto) {
    return this.createUseCase.execute(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateCentroDto) {
    return this.updateUseCase.execute(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.getByIdUseCase.execute(id);
  }

  @Get()
  getAll() {
    return this.getAllUseCase.execute();
  }
}
