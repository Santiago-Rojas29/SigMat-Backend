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
import { CreateProgramaUseCase } from '../../../application/use-cases/create-programa.use-case';
import { ActualizarProgramaUseCase } from '../../../application/use-cases/actualizar-programa.use-case';
import { EliminarProgramaUseCase } from '../../../application/use-cases/eliminar-programa.use-case';
import { ObtenerPorIdProgramaUseCase } from '../../../application/use-cases/obtener-por-id-programa.use-case';
import { ObtenerTodosProgramaUseCase } from '../../../application/use-cases/obtener-todos-programa.use-case';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@UseGuards(JwtAuthGuard)
@Controller('programa')
export class ProgramaController {
  constructor(
    private readonly createUseCase: CreateProgramaUseCase,
    private readonly actualizarUseCase: ActualizarProgramaUseCase,
    private readonly eliminarUseCase: EliminarProgramaUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdProgramaUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosProgramaUseCase,
  ) { }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('estructura', 'programas', 'crear')
  crear(@Body() body: CreateProgramaDto) {
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
  @RequirePermission('estructura', 'programas', 'editar')
  actualizar(
    @Param('id') id: string,
    @Body() body: UpdateProgramaDto,
  ) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('estructura', 'programas', 'eliminar')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
