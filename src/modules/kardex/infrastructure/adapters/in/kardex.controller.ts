import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../../common/guards/permissions.guard';
import { RequirePermission } from '../../../../../common/decorators/require-permission.decorator';
import { CrearKardexUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosKardexUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdKardexUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarKardexUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarKardexUseCase } from '../../../application/use-cases/eliminar.use-case';
import { CrearKardexDto } from './dto/crear.dto';
import { ActualizarKardexDto } from './dto/actualizar.dto';

@UseGuards(JwtAuthGuard)
@Controller('kardex')
export class KardexController {
  constructor(
    private readonly crearUseCase: CrearKardexUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosKardexUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdKardexUseCase,
    private readonly actualizarUseCase: ActualizarKardexUseCase,
    private readonly eliminarUseCase: EliminarKardexUseCase,
  ) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('control', 'kardex', 'crear')
  crear(@Body() body: CrearKardexDto) {
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
  @RequirePermission('control', 'kardex', 'editar')
  actualizar(@Param('id') id: string, @Body() body: ActualizarKardexDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('control', 'kardex', 'eliminar')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
