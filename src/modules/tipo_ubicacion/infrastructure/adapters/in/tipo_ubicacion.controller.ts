import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateTipoUbicacionUseCase } from '../../../application/use-cases/create-tipo-ubicacion.use-case';
import { ActualizarTipoUbicacionUseCase } from '../../../application/use-cases/actualizar-tipo-ubicacion.use-case';
import { EliminarTipoUbicacionUseCase } from '../../../application/use-cases/eliminar-tipo-ubicacion.use-case';
import { ObtenerPorIdTipoUbicacionUseCase } from '../../../application/use-cases/obtener-por-id-tipo-ubicacion.use-case';
import { ObtenerTodosTipoUbicacionUseCase } from '../../../application/use-cases/obtener-todos-tipo-ubicacion.use-case';
import { CreateTipoUbicacionDto } from './dto/create-tipo-ubicacion.dto';
import { UpdateTipoUbicacionDto } from './dto/update-tipo-ubicacion.dto';

@Controller('tipo-ubicacion')
export class TipoUbicacionController {
  constructor(
    private readonly createUseCase: CreateTipoUbicacionUseCase,
    private readonly actualizarUseCase: ActualizarTipoUbicacionUseCase,
    private readonly eliminarUseCase: EliminarTipoUbicacionUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdTipoUbicacionUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosTipoUbicacionUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateTipoUbicacionDto) {
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
    @Body() body: UpdateTipoUbicacionDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
