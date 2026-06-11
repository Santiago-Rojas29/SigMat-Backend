import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard }       from '../../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard }   from '../../../../../common/guards/permissions.guard';
import { RequirePermission }  from '../../../../../common/decorators/require-permission.decorator';
import { AsignarRolPermisosUseCase }    from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosRolPermisosUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorRolUseCase }         from '../../../application/use-cases/obtener-por-ids.use-case';
import { ActualizarRolPermisosUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarRolPermisosUseCase }   from '../../../application/use-cases/eliminar.use-case';
import { AsignarRolPermisosDto }        from './dto/crear.dto';
import { ActualizarRolPermisosDto }     from './dto/actualizar.dto';

@UseGuards(JwtAuthGuard)
@Controller('rol-permisos')
export class RolPermisosController {
  constructor(
    private readonly asignarUseCase:       AsignarRolPermisosUseCase,
    private readonly obtenerTodosUseCase:  ObtenerTodosRolPermisosUseCase,
    private readonly obtenerPorRolUseCase: ObtenerPorRolUseCase,
    private readonly actualizarUseCase:    ActualizarRolPermisosUseCase,
    private readonly eliminarUseCase:      EliminarRolPermisosUseCase,
  ) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('administracion')
  asignar(@Body() body: AsignarRolPermisosDto) {
    return this.asignarUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get('rol/:id_rol')
  obtenerPorRol(@Param('id_rol') id_rol: string) {
    return this.obtenerPorRolUseCase.execute(id_rol);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('administracion')
  actualizar(
    @Param('id') id: string,
    @Body() body: ActualizarRolPermisosDto,
  ) {
    return this.actualizarUseCase.execute(id, body.submodulos, body.acciones);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('administracion')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
