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
import { CreateUbicacionUseCase } from '../../../application/use-cases/create-ubicacion.use-case';
import { ActualizarUbicacionUseCase } from '../../../application/use-cases/actualizar-ubicacion.use-case';
import { EliminarUbicacionUseCase } from '../../../application/use-cases/eliminar-ubicacion.use-case';
import { ObtenerPorIdUbicacionUseCase } from '../../../application/use-cases/obtener-por-id-ubicacion.use-case';
import { ObtenerTodosUbicacionUseCase } from '../../../application/use-cases/obtener-todos-ubicacion.use-case';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';

@UseGuards(JwtAuthGuard)
@Controller('ubicacion')
export class UbicacionController {
  constructor(
    private readonly createUseCase: CreateUbicacionUseCase,
    private readonly actualizarUseCase: ActualizarUbicacionUseCase,
    private readonly eliminarUseCase: EliminarUbicacionUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdUbicacionUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosUbicacionUseCase,
  ) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('inventario', 'ubicaciones', 'crear')
  crear(@Body() body: CreateUbicacionDto) {
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
    @Body() body: UpdateUbicacionDto,
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
