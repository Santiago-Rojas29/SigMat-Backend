import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../../common/guards/permissions.guard';
import { RequirePermission } from '../../../../../common/decorators/require-permission.decorator';
import { CrearRolPermisosUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosRolPermisosUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdsRolPermisosUseCase } from '../../../application/use-cases/obtener-por-ids.use-case';
import { CrearRolPermisosDto } from './dto/crear.dto';

@UseGuards(JwtAuthGuard)
@Controller('rol-permisos')
export class RolPermisosController {
  constructor(
    private readonly crearUseCase: CrearRolPermisosUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosRolPermisosUseCase,
    private readonly obtenerPorIdsUseCase: ObtenerPorIdsRolPermisosUseCase,
  ) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('administracion')
  crear(@Body() body: CrearRolPermisosDto) {
    return this.crearUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get(':id_rol/:id_permiso')
  obtenerPorIds(
    @Param('id_rol') id_rol: string,
    @Param('id_permiso') id_permiso: string,
  ) {
    return this.obtenerPorIdsUseCase.execute(id_rol, id_permiso);
  }
}
