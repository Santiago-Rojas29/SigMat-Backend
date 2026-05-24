import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { CrearRolUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosRolUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdRolUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarRolUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarRolUseCase } from '../../../application/use-cases/eliminar.use-case';
import { CrearRolDto } from './dto/crear.dto';
import { ActualizarRolDto } from './dto/actualizar.dto';

@UseGuards(JwtAuthGuard)
@Controller('rol')
export class RolController {
  constructor(
    private readonly crearUseCase: CrearRolUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosRolUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdRolUseCase,
    private readonly actualizarUseCase: ActualizarRolUseCase,
    private readonly eliminarUseCase: EliminarRolUseCase,
  ) {}

  @Post()
  crear(@Body() body: CrearRolDto) {
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
  actualizar(@Param('id') id: string, @Body() body: ActualizarRolDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
