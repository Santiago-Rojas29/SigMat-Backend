import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { CrearLoteFichaUseCase }       from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosLoteFichaUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ActualizarLoteFichaUseCase }   from '../../../application/use-cases/actualizar.use-case';
import { EliminarLoteFichaUseCase }     from '../../../application/use-cases/eliminar.use-case';
import { CrearLoteFichaDto }     from './dto/crear.dto';
import { ActualizarLoteFichaDto } from './dto/actualizar.dto';

@UseGuards(JwtAuthGuard)
@Controller('lote-ficha')
export class LoteFichaController {
  constructor(
    private readonly crearUseCase:       CrearLoteFichaUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosLoteFichaUseCase,
    private readonly actualizarUseCase:   ActualizarLoteFichaUseCase,
    private readonly eliminarUseCase:     EliminarLoteFichaUseCase,
  ) {}

  @Post()
  crear(@Body() body: CrearLoteFichaDto) {
    return this.crearUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() body: ActualizarLoteFichaDto) {
    return this.actualizarUseCase.execute(id, body.cantidad);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
