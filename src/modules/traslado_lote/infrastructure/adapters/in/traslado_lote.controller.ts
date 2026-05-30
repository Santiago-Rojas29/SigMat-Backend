import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { CrearTrasladoLoteUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosTrasladoLoteUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdsTrasladoLoteUseCase } from '../../../application/use-cases/obtener-por-ids.use-case';
import { CrearTrasladoLoteDto } from './dto/crear.dto';

@UseGuards(JwtAuthGuard)
@Controller('traslado-lote')
export class TrasladoLoteController {
  constructor(
    private readonly crearUseCase: CrearTrasladoLoteUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosTrasladoLoteUseCase,
    private readonly obtenerPorIdsUseCase: ObtenerPorIdsTrasladoLoteUseCase,
  ) {}

  @Post()
  crear(@Body() body: CrearTrasladoLoteDto) {
    return this.crearUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get(':id_traslado/:id_lote')
  obtenerPorIds(
    @Param('id_traslado') id_traslado: string,
    @Param('id_lote') id_lote: string,
  ) {
    return this.obtenerPorIdsUseCase.execute(id_traslado, id_lote);
  }
}
