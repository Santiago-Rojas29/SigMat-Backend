import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../../common/guards/permissions.guard';
import { RequirePermission } from '../../../../../common/decorators/require-permission.decorator';
import { CrearPermisosUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosPermisosUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdPermisosUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarPermisosUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarPermisosUseCase } from '../../../application/use-cases/eliminar.use-case';
import { CrearPermisosDto } from './dto/crear.dto';
import { ActualizarPermisosDto } from './dto/actualizar.dto';

@UseGuards(JwtAuthGuard)
@Controller('permisos')
export class PermisosController {
  constructor(
    private readonly crearUseCase: CrearPermisosUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosPermisosUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdPermisosUseCase,
    private readonly actualizarUseCase: ActualizarPermisosUseCase,
    private readonly eliminarUseCase: EliminarPermisosUseCase,
  ) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('usuarios')
  crear(@Body() body: CrearPermisosDto) {
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
  @RequirePermission('usuarios')
  actualizar(@Param('id') id: string, @Body() body: ActualizarPermisosDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('usuarios')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
