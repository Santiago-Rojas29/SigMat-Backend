import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { CreateEntregaUnidadUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosEntregaUnidadUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerEntregaUnidadPorIdsUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { EliminarEntregaUnidadUseCase } from '../../../application/use-cases/eliminar.use-case';
import { CreateEntregaUnidadDto } from './dto/crear.dto';

@UseGuards(JwtAuthGuard)
@Controller('entrega-unidad')
export class EntregaUnidadController {
  constructor(
    private readonly createUseCase: CreateEntregaUnidadUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosEntregaUnidadUseCase,
    private readonly obtenerPorIdsUseCase: ObtenerEntregaUnidadPorIdsUseCase,
    private readonly eliminarUseCase: EliminarEntregaUnidadUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateEntregaUnidadDto) {
    return this.createUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get(':id_entrega/:id_unidad')
  obtenerPorIds(@Param('id_entrega') id_entrega: string, @Param('id_unidad') id_unidad: string) {
    return this.obtenerPorIdsUseCase.execute(id_entrega, id_unidad);
  }

  @Delete(':id_entrega/:id_unidad')
  eliminar(@Param('id_entrega') id_entrega: string, @Param('id_unidad') id_unidad: string) {
    return this.eliminarUseCase.execute(id_entrega, id_unidad);
  }
}
