import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../../common/guards/permissions.guard';
import { RequirePermission } from '../../../../../common/decorators/require-permission.decorator';
import { AsignarUsuarioPermisosUseCase } from '../../../application/use-cases/asignar.use-case';
import { RevocarUsuarioPermisosUseCase } from '../../../application/use-cases/revocar.use-case';
import { RevocarTodosPermisosUseCase } from '../../../application/use-cases/revocar-todos.use-case';
import { ObtenerPermisosDeUsuarioUseCase } from '../../../application/use-cases/obtener-por-usuario.use-case';
import { ActualizarSubmodulosUseCase } from '../../../application/use-cases/actualizar-submodulos.use-case';
import { AsignarPermisoDto } from './dto/asignar.dto';
import { ActualizarSubmodulosDto } from './dto/actualizar-submodulos.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@RequirePermission('administracion')
@Controller('usuario-permisos')
export class UsuarioPermisosController {
  constructor(
    private readonly asignarUseCase: AsignarUsuarioPermisosUseCase,
    private readonly revocarUseCase: RevocarUsuarioPermisosUseCase,
    private readonly revocarTodosUseCase: RevocarTodosPermisosUseCase,
    private readonly obtenerPorUsuarioUseCase: ObtenerPermisosDeUsuarioUseCase,
    private readonly actualizarSubmodulosUseCase: ActualizarSubmodulosUseCase,
  ) {}

  @Post()
  asignar(@Body() body: AsignarPermisoDto) {
    return this.asignarUseCase.execute(body);
  }

  @Get('usuario/:id_usuario')
  obtenerPorUsuario(@Param('id_usuario') id_usuario: string) {
    return this.obtenerPorUsuarioUseCase.execute(id_usuario);
  }

  @Patch(':id/submodulos')
  actualizarSubmodulos(
    @Param('id') id: string,
    @Body() body: ActualizarSubmodulosDto,
  ) {
    return this.actualizarSubmodulosUseCase.execute(id, body.submodulos);
  }

  @Delete(':id')
  revocar(@Param('id') id: string) {
    return this.revocarUseCase.execute(id);
  }

  @Delete('usuario/:id_usuario/todos')
  revocarTodos(@Param('id_usuario') id_usuario: string) {
    return this.revocarTodosUseCase.execute(id_usuario);
  }
}
