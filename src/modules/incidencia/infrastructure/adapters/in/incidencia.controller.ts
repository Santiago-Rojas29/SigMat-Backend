import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../../common/guards/permissions.guard';
import { RequirePermission } from '../../../../../common/decorators/require-permission.decorator';
import { CrearIncidenciaUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosIncidenciaUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdIncidenciaUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarIncidenciaUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarIncidenciaUseCase } from '../../../application/use-cases/eliminar.use-case';
import { CrearIncidenciaDto } from './dto/crear.dto';
import { ActualizarIncidenciaDto } from './dto/actualizar.dto';

@UseGuards(JwtAuthGuard)
@Controller('incidencia')
export class IncidenciaController {
  constructor(
    private readonly crearUseCase: CrearIncidenciaUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosIncidenciaUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdIncidenciaUseCase,
    private readonly actualizarUseCase: ActualizarIncidenciaUseCase,
    private readonly eliminarUseCase: EliminarIncidenciaUseCase,
  ) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('control', 'incidencias', 'crear')
  crear(@Body() body: CrearIncidenciaDto) {
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
  @UseGuards(PermissionsGuard)
  @RequirePermission('control', 'incidencias', 'editar')
  actualizar(@Param('id') id: string, @Body() body: ActualizarIncidenciaDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('control', 'incidencias', 'eliminar')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
