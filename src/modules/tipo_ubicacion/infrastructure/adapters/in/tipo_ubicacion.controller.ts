import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../../common/guards/permissions.guard';
import { RequirePermission } from '../../../../../common/decorators/require-permission.decorator';
import { CreateTipoUbicacionUseCase } from '../../../application/use-cases/create-tipo-ubicacion.use-case';
import { ActualizarTipoUbicacionUseCase } from '../../../application/use-cases/actualizar-tipo-ubicacion.use-case';
import { EliminarTipoUbicacionUseCase } from '../../../application/use-cases/eliminar-tipo-ubicacion.use-case';
import { ObtenerPorIdTipoUbicacionUseCase } from '../../../application/use-cases/obtener-por-id-tipo-ubicacion.use-case';
import { ObtenerTodosTipoUbicacionUseCase } from '../../../application/use-cases/obtener-todos-tipo-ubicacion.use-case';
import { CreateTipoUbicacionDto } from './dto/create-tipo-ubicacion.dto';
import { UpdateTipoUbicacionDto } from './dto/update-tipo-ubicacion.dto';

@UseGuards(JwtAuthGuard)
@Controller('tipo-ubicacion')
export class TipoUbicacionController {
  constructor(
    private readonly createUseCase: CreateTipoUbicacionUseCase,
    private readonly actualizarUseCase: ActualizarTipoUbicacionUseCase,
    private readonly eliminarUseCase: EliminarTipoUbicacionUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdTipoUbicacionUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosTipoUbicacionUseCase,
  ) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('inventario', 'ubicaciones', 'crear')
  crear(@Body() body: CreateTipoUbicacionDto) {
    return this.createUseCase.execute(body);
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
  @RequirePermission('inventario', 'ubicaciones', 'editar')
  actualizar(
    @Param('id') id: string,
    @Body() body: UpdateTipoUbicacionDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('inventario', 'ubicaciones', 'eliminar')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
