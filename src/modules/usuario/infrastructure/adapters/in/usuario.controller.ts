import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CrearUsuarioUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosUsuarioUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdUsuarioUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarUsuarioUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarUsuarioUseCase } from '../../../application/use-cases/eliminar.use-case';
import { CrearUsuarioDto } from './dto/crear.dto';
import { ActualizarUsuarioDto } from './dto/actualizar.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly crearUseCase: CrearUsuarioUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosUsuarioUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdUsuarioUseCase,
    private readonly actualizarUseCase: ActualizarUsuarioUseCase,
    private readonly eliminarUseCase: EliminarUsuarioUseCase,
  ) {}

  @Post()
  crear(@Body() body: CrearUsuarioDto) {
    return this.crearUseCase.execute(body);
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
  actualizar(@Param('id') id: string, @Body() body: ActualizarUsuarioDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
