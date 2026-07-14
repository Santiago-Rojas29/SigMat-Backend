import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../../common/guards/permissions.guard';
import { RequirePermission } from '../../../../../common/decorators/require-permission.decorator';
import { CrearUsuarioUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosUsuarioUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdUsuarioUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarUsuarioUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarUsuarioUseCase } from '../../../application/use-cases/eliminar.use-case';
import { ActualizarDisponibilidadUseCase } from '../../../application/use-cases/actualizar-disponibilidad.use-case';
import { CrearUsuarioDto } from './dto/crear.dto';
import { ActualizarUsuarioDto } from './dto/actualizar.dto';
import { ActualizarPerfilDto } from './dto/actualizar-perfil.dto';
import { ActualizarDisponibilidadDto } from './dto/actualizar-disponibilidad.dto';

interface JwtRequest {
  user: { id: string; correo: string; id_rol: string };
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly crearUseCase: CrearUsuarioUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosUsuarioUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdUsuarioUseCase,
    private readonly actualizarUseCase: ActualizarUsuarioUseCase,
    private readonly eliminarUseCase: EliminarUsuarioUseCase,
    private readonly actualizarDisponibilidadUseCase: ActualizarDisponibilidadUseCase,
  ) {}

  @Get('me')
  obtenerMiPerfil(@Request() req: JwtRequest) {
    return this.obtenerPorIdUseCase.execute(req.user.id);
  }

  @Patch('me')
  actualizarMiPerfil(@Request() req: JwtRequest, @Body() body: ActualizarPerfilDto) {
    return this.actualizarUseCase.execute(req.user.id, {
      nombres:  body.nombres,
      apellidos: body.apellidos,
      telefono: body.telefono,
      correo:   body.correo,
    });
  }

  @Patch('me/disponibilidad')
  actualizarMiDisponibilidad(@Request() req: JwtRequest, @Body() body: ActualizarDisponibilidadDto) {
    return this.actualizarDisponibilidadUseCase.execute(req.user.id, body.disponible);
  }

  @RequirePermission('administracion', 'usuarios', 'crear')
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

  @RequirePermission('administracion', 'usuarios', 'editar')
  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() body: ActualizarUsuarioDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @RequirePermission('administracion', 'usuarios', 'eliminar')
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
