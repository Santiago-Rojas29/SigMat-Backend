import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateLoteFichaUseCase }       from '../../../application/use-cases/create-lote-ficha.use-case';
import { ObtenerTodosLoteFichaUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorLoteUseCase }        from '../../../application/use-cases/obtener-por-lote.use-case';
import { ActualizarLoteFichaUseCase }   from '../../../application/use-cases/actualizar-lote-ficha.use-case';
import { EliminarLoteFichaUseCase }     from '../../../application/use-cases/eliminar-lote-ficha.use-case';
import { CreateLoteFichaDto }           from './dto/create-lote-ficha.dto';
import { UpdateLoteFichaDto }           from './dto/update-lote-ficha.dto';

@Controller('lote-ficha')
export class LoteFichaController {
  constructor(
    private readonly createUC:       CreateLoteFichaUseCase,
    private readonly obtenerTodosUC: ObtenerTodosLoteFichaUseCase,
    private readonly porLoteUC:      ObtenerPorLoteUseCase,
    private readonly actualizarUC:   ActualizarLoteFichaUseCase,
    private readonly eliminarUC:     EliminarLoteFichaUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateLoteFichaDto) {
    return this.createUC.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUC.execute();
  }

  @Get('lote/:id_lote')
  obtenerPorLote(@Param('id_lote') id_lote: string) {
    return this.porLoteUC.execute(id_lote);
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() body: UpdateLoteFichaDto) {
    return this.actualizarUC.execute(id, body.cantidad!);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUC.execute(id);
  }
}
