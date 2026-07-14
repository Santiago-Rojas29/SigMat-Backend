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
import { CreateSedeUseCase } from '../../../application/use-cases/create-sede.use-case';
import { ActualizarSedeUseCase } from '../../../application/use-cases/actualizar-sede.use-case';
import { EliminarSedeUseCase } from '../../../application/use-cases/eliminar-sede.use-case';
import { ObtenerPorIdSedeUseCase } from '../../../application/use-cases/obtener-por-id-sede.use-case';
import { ObtenerTodosSedeUseCase } from '../../../application/use-cases/obtener-todos-sede.use-case';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';

@UseGuards(JwtAuthGuard)
@Controller('sede')
export class SedeController {
  constructor(
    private readonly createUseCase: CreateSedeUseCase,
    private readonly actualizarUseCase: ActualizarSedeUseCase,
    private readonly eliminarUseCase: EliminarSedeUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdSedeUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosSedeUseCase,
  ) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('estructura', 'sedes', 'crear')
  crear(@Body() body: CreateSedeDto) {
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
  @RequirePermission('estructura', 'sedes', 'editar')
  actualizar(
    @Param('id') id: string,
    @Body() body: UpdateSedeDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('estructura', 'sedes', 'eliminar')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
