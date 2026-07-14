import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../../common/guards/permissions.guard';
import { RequirePermission } from '../../../../../common/decorators/require-permission.decorator';
import { CrearMaterialUseCase } from '../../../application/use-cases/crear.use-case';
import { ObtenerTodosMaterialUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdMaterialUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { ActualizarMaterialUseCase } from '../../../application/use-cases/actualizar.use-case';
import { EliminarMaterialUseCase } from '../../../application/use-cases/eliminar.use-case';
import { ImportarMaterialesUseCase } from '../../../application/use-cases/importar-materiales.use-case';
import { CatalogoMaterialesUseCase } from '../../../application/use-cases/catalogo-materiales.use-case';
import { CrearMaterialDto } from './dto/crear.dto';
import { ActualizarMaterialDto } from './dto/actualizar.dto';
import { ImportarMaterialesDto } from './dto/importar.dto';

@UseGuards(JwtAuthGuard)
@Controller('material')
export class MaterialController {
  constructor(
    private readonly crearUseCase: CrearMaterialUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosMaterialUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdMaterialUseCase,
    private readonly actualizarUseCase: ActualizarMaterialUseCase,
    private readonly eliminarUseCase: EliminarMaterialUseCase,
    private readonly importarUseCase: ImportarMaterialesUseCase,
    private readonly catalogoUseCase: CatalogoMaterialesUseCase,
  ) {}

  @Get('catalogo')
  catalogo(@Req() req: any) {
    const esAprendiz = req.user?.nombre_rol === 'Aprendiz';
    return this.catalogoUseCase.execute(req.user?.id, esAprendiz);
  }

  @Post('importar')
  @UseGuards(PermissionsGuard)
  @RequirePermission('inventario', 'materiales', 'crear')
  importar(@Body() body: ImportarMaterialesDto) {
    return this.importarUseCase.execute(body.materiales);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('inventario', 'materiales', 'crear')
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
  @UseGuards(PermissionsGuard)
  @RequirePermission('inventario', 'materiales', 'editar')
  actualizar(@Param('id') id: string, @Body() body: ActualizarMaterialDto) {
    return this.actualizarUseCase.execute(id, body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('inventario', 'materiales', 'eliminar')
  eliminar(@Param('id') id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
