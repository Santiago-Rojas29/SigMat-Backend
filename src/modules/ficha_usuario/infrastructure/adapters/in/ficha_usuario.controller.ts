import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateFichaUsuarioUseCase } from '../../../application/use-cases/create-ficha-usuario.use-case';
import { ActualizarFichaUsuarioUseCase } from '../../../application/use-cases/actualizar-ficha-usuario.use-case';
import { EliminarFichaUsuarioUseCase } from '../../../application/use-cases/eliminar-ficha-usuario.use-case';
import { ObtenerPorIdFichaUsuarioUseCase } from '../../../application/use-cases/obtener-por-id-ficha-usuario.use-case';
import { ObtenerTodosFichaUsuarioUseCase } from '../../../application/use-cases/obtener-todos-ficha-usuario.use-case';
import { CreateFichaUsuarioDto } from './dto/create-ficha-usuario.dto';
import { UpdateFichaUsuarioDto } from './dto/update-ficha-usuario.dto';

@Controller('ficha-usuario')
export class FichaUsuarioController {
  constructor(
    private readonly createUseCase: CreateFichaUsuarioUseCase,
    private readonly actualizarUseCase: ActualizarFichaUsuarioUseCase,
    private readonly eliminarUseCase: EliminarFichaUsuarioUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdFichaUsuarioUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosFichaUsuarioUseCase,
  ) { }

  @Post()
  crear(@Body() body: CreateFichaUsuarioDto) {
    return this.createUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get(':id_ficha/:id_usuario')
  obtenerPorId(
    @Param('id_ficha') id_ficha: string,
    @Param('id_usuario') id_usuario: string,
  ) {
    return this.obtenerPorIdUseCase.execute(id_ficha, id_usuario);
  }

  @Patch(':id_ficha/:id_usuario')
  actualizar(
    @Param('id_ficha') id_ficha: string,
    @Param('id_usuario') id_usuario: string,
    @Body() body: UpdateFichaUsuarioDto,
  ) {
    return this.actualizarUseCase.execute(id_ficha, id_usuario, body);
  }

  @Delete(':id_ficha/:id_usuario')
  eliminar(
    @Param('id_ficha') id_ficha: string,
    @Param('id_usuario') id_usuario: string,
  ) {
    return this.eliminarUseCase.execute(id_ficha, id_usuario);
  }
}
