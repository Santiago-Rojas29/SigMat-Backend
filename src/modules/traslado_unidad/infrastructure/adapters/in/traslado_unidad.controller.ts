import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CrearTrasladoUnidadUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosTrasladoUnidadUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdsTrasladoUnidadUseCase } from '../../../application/use-cases/obtener-por-ids.use-case';
import { CrearTrasladoUnidadDto } from './dto/crear.dto';

@Controller('traslado-unidad')
export class TrasladoUnidadController {
  constructor(
    private readonly crearUseCase: CrearTrasladoUnidadUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosTrasladoUnidadUseCase,
    private readonly obtenerPorIdsUseCase: ObtenerPorIdsTrasladoUnidadUseCase,
  ) {}

  @Post()
  crear(@Body() body: CrearTrasladoUnidadDto) {
    return this.crearUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get(':id_traslado/:id_unidad')
  obtenerPorIds(
    @Param('id_traslado') id_traslado: string,
    @Param('id_unidad') id_unidad: string,
  ) {
    return this.obtenerPorIdsUseCase.execute(id_traslado, id_unidad);
  }
}
