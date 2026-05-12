import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CrearEntregaLoteUseCase } from '../../../application/use-cases/crear.use-case';
import { ActualizarEntregaLoteUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarEntregaLoteUseCase } from '../../../application/use-cases/eliminar.use-case';
import { ObtenerTodosEntregaLoteUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerEntregaLotePorIdsUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { CrearEntregaLoteDto } from './dto/crear.dto';
import { ActualizarEntregaLoteDto } from './dto/actualizar.dto';

@Controller('entrega-lote')
export class EntregaLoteController {
  constructor(
    private readonly crearUseCase: CrearEntregaLoteUseCase,
    private readonly actualizarUseCase: ActualizarEntregaLoteUseCase,
    private readonly eliminarUseCase: EliminarEntregaLoteUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosEntregaLoteUseCase,
    private readonly obtenerPorIdsUseCase: ObtenerEntregaLotePorIdsUseCase,
  ) {}

  @Post()
  crear(@Body() body: CrearEntregaLoteDto) {
    return this.crearUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get(':id_entrega/:id_lote')
  obtenerPorIds(@Param('id_entrega') id_entrega: string, @Param('id_lote') id_lote: string) {
    return this.obtenerPorIdsUseCase.execute(id_entrega, id_lote);
  }

  @Patch(':id_entrega/:id_lote')
  actualizar(
    @Param('id_entrega') id_entrega: string,
    @Param('id_lote') id_lote: string,
    @Body() body: ActualizarEntregaLoteDto,
  ) {
    return this.actualizarUseCase.execute(id_entrega, id_lote, body);
  }

  @Delete(':id_entrega/:id_lote')
  eliminar(@Param('id_entrega') id_entrega: string, @Param('id_lote') id_lote: string) {
    return this.eliminarUseCase.execute(id_entrega, id_lote);
  }
}
