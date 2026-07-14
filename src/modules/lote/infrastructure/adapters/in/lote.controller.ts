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
import { CreateLoteUseCase } from '../../../application/use-cases/create-lote.use-case';
import { ActualizarLoteUseCase } from '../../../application/use-cases/actualizar-lote.use-case';
import { EliminarLoteUseCase } from '../../../application/use-cases/eliminar-lote.use-case';
import { ObtenerPorIdUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ObtenerTodosUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerLotesPorUbicacionUseCase } from '../../../application/use-cases/obtener-por-ubicacion.use-case';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';

@UseGuards(JwtAuthGuard)
@Controller('lote')
export class LoteController {
  constructor(
    private readonly createUseCase: CreateLoteUseCase,
    private readonly actualizarUseCase: ActualizarLoteUseCase,
    private readonly eliminarUseCase: EliminarLoteUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosUseCase,
    private readonly obtenerPorUbicacionUseCase: ObtenerLotesPorUbicacionUseCase,
  ) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('inventario', 'lotes', 'crear')
  crear(@Body() body: CreateLoteDto) {
    return this.createUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get('por-ubicacion/:id')
  obtenerPorUbicacion(@Param('id') id: string) {
    return this.obtenerPorUbicacionUseCase.execute(id);
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.obtenerPorIdUseCase.execute(id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('inventario', 'lotes', 'editar')
  actualizar(
    @Param('id') id: string,
    @Body() body: UpdateLoteDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('inventario', 'lotes', 'eliminar')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
