import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CreateSolicitudAprendizUseCase } from '../../../application/use-cases/create-solicitud-aprendiz.use-case';
import { ObtenerTodosUseCase } from '../../../application/use-cases/obtener-todos.use-case';
import { ObtenerPorIdUseCase } from '../../../application/use-cases/obtener-por-id.use-case';
import { EliminarSolicitudAprendizUseCase } from '../../../application/use-cases/eliminar-solicitud-aprendiz.use-case';
import { CreateSolicitudAprendizDto } from './dto/create-solicitud-aprendiz.dto';

@Controller('solicitud-aprendiz')
export class SolicitudAprendizController {
  constructor(
    private readonly createUseCase: CreateSolicitudAprendizUseCase,
    private readonly obtenerTodosUseCase: ObtenerTodosUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPorIdUseCase,
    private readonly eliminarUseCase: EliminarSolicitudAprendizUseCase,
  ) {}

  @Post()
  crear(@Body() body: CreateSolicitudAprendizDto) {
    return this.createUseCase.execute(body);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerTodosUseCase.execute();
  }

  @Get(':id_solicitud/:id_aprendiz')
  obtenerPorId(
    @Param('id_solicitud') id_solicitud: string,
    @Param('id_aprendiz') id_aprendiz: string,
  ) {
    return this.obtenerPorIdUseCase.execute(id_solicitud, id_aprendiz);
  }

  @Delete(':id_solicitud/:id_aprendiz')
  eliminar(
    @Param('id_solicitud') id_solicitud: string,
    @Param('id_aprendiz') id_aprendiz: string,
  ) {
    return this.eliminarUseCase.execute(id_solicitud, id_aprendiz);
  }
}
