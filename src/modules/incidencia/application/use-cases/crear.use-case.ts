import { Inject, Injectable } from '@nestjs/common';
import { Incidencia, TipoIncidencia, EstadoIncidencia } from '../../domain/entities/incidencia.entity';
import type { IncidenciaRepository } from '../../domain/ports/incidencia.repository';

@Injectable()
export class CrearIncidenciaUseCase {
  constructor(
    @Inject('IncidenciaRepository')
    private readonly repo: IncidenciaRepository,
  ) {}

  async execute(data: {
    id_unidad: string;
    id_usuario: string;
    tipo: TipoIncidencia;
    fecha_incidencia: string;
    descripcion: string;
    estado: EstadoIncidencia;
  }): Promise<Incidencia> {
    const entity = new Incidencia(
      '',
      data.id_unidad,
      data.id_usuario,
      data.tipo,
      new Date(data.fecha_incidencia),
      data.descripcion,
      data.estado,
    );
    entity.validar();
    return this.repo.crear(entity);
  }
}
