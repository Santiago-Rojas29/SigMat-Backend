import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { CrearDevolucionUnidadUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosDevolucionUnidadUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdsDevolucionUnidadUseCase } from '../../../application/use-cases/obtener-por-ids.use-case';
import { CrearDevolucionUnidadDto } from './dto/crear.dto';

@UseGuards(JwtAuthGuard)
@Controller('devolucion-unidad')
export class DevolucionUnidadController {
  constructor(
    private readonly crearUseCase: CrearDevolucionUnidadUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosDevolucionUnidadUseCase,
    private readonly obtenerPorIdsUseCase: ObtenerPorIdsDevolucionUnidadUseCase,
  ) {}

  @Post()
  crear(@Body() body: CrearDevolucionUnidadDto) {
    return this.crearUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get(':id_devolucion/:id_unidad')
  obtenerPorIds(
    @Param('id_devolucion') id_devolucion: string,
    @Param('id_unidad') id_unidad: string,
  ) {
    return this.obtenerPorIdsUseCase.execute(id_devolucion, id_unidad);
  }
}
