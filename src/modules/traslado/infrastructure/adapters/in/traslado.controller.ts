import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../../common/guards/permissions.guard';
import { RequirePermission } from '../../../../../common/decorators/require-permission.decorator';
import { CrearTrasladoUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosTrasladoUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdTrasladoUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarTrasladoUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarTrasladoUseCase } from '../../../application/use-cases/eliminar.use-case';
import { RealizarTrasladoUseCase } from '../../../application/use-cases/realizar-traslado.use-case';
import { CrearTrasladoDto } from './dto/crear.dto';
import { ActualizarTrasladoDto } from './dto/actualizar.dto';
import { RealizarTrasladoDto } from './dto/realizar-traslado.dto';

@UseGuards(JwtAuthGuard)
@Controller('traslado')
export class TrasladoController {
  constructor(
    private readonly crearUseCase: CrearTrasladoUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosTrasladoUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdTrasladoUseCase,
    private readonly actualizarUseCase: ActualizarTrasladoUseCase,
    private readonly eliminarUseCase: EliminarTrasladoUseCase,
    private readonly realizarUseCase: RealizarTrasladoUseCase,
  ) {}

  @Post('realizar')
  @UseGuards(PermissionsGuard)
  @RequirePermission('control', 'traslados', 'crear')
  realizar(@Body() body: RealizarTrasladoDto) {
    return this.realizarUseCase.execute(body);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('control', 'traslados', 'crear')
  crear(@Body() body: CrearTrasladoDto) {
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
  @RequirePermission('control', 'traslados', 'editar')
  actualizar(@Param('id') id: string, @Body() body: ActualizarTrasladoDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('control', 'traslados', 'eliminar')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
