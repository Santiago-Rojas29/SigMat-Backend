import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { CrearMaterialUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosMaterialUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdMaterialUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarMaterialUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarMaterialUseCase } from '../../../application/use-cases/eliminar.use-case';
import { CrearMaterialDto } from './dto/crear.dto';
import { ActualizarMaterialDto } from './dto/actualizar.dto';

@UseGuards(JwtAuthGuard)
@Controller('material')
export class MaterialController {
  constructor(
    private readonly crearUseCase: CrearMaterialUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosMaterialUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdMaterialUseCase,
    private readonly actualizarUseCase: ActualizarMaterialUseCase,
    private readonly eliminarUseCase: EliminarMaterialUseCase,
  ) {}

  @Post()
  crear(@Body() body: CrearMaterialDto) {
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
  actualizar(@Param('id') id: string, @Body() body: ActualizarMaterialDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
