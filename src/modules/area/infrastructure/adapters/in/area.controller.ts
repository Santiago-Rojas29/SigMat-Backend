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
import { CreateAreaUseCase } from '../../../application/use-cases/create-area.use-case';
import { ActualizarAreaUseCase } from '../../../application/use-cases/actualizar-area.use-case';
import { EliminarAreaUseCase } from '../../../application/use-cases/eliminar-area.use-case';
import { ObtenerPorIdAreaUseCase } from '../../../application/use-cases/obtener-por-id-area.use-case';
import { ObtenerTodosAreaUseCase } from '../../../application/use-cases/obtener-todos-area.use-case';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@UseGuards(JwtAuthGuard)
@Controller('area')
export class AreaController {
  constructor(
    private readonly createUseCase: CreateAreaUseCase,
    private readonly actualizarUseCase: ActualizarAreaUseCase,
    private readonly eliminarUseCase: EliminarAreaUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdAreaUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosAreaUseCase,
  ) { }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('estructura', 'areas', 'crear')
  crear(@Body() body: CreateAreaDto) {
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
  @RequirePermission('estructura', 'areas', 'editar')
  actualizar(
    @Param('id') id: string,
    @Body() body: UpdateAreaDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('estructura', 'areas', 'eliminar')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
