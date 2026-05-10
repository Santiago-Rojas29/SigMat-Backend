import { Inject, Injectable } from '@nestjs/common';
import { Incidencia, TipoIncidencia, EstadoIncidencia } from '../../domain/entities/incidencia.entity';
import type { IncidenciaRepository } from '../../domain/ports/incidencia.repository';

@Injectable()
export class ActualizarIncidenciaUseCase {
  constructor(
    @Inject('IncidenciaRepository')
    private readonly repo: IncidenciaRepository,
  ) {}

  async execute(
    id: string,
    data: {
      id_unidad?: string;
      id_usuario?: string;
      tipo?: TipoIncidencia;
      fecha_incidencia?: string;
      descripcion?: string;
      estado?: EstadoIncidencia;
    },
  ): Promise<Incidencia> {
    const mapped: Partial<Incidencia> = {
      ...(data.id_unidad && { id_unidad: data.id_unidad }),
      ...(data.id_usuario && { id_usuario: data.id_usuario }),
      ...(data.tipo && { tipo: data.tipo }),
      ...(data.fecha_incidencia && { fecha_incidencia: new Date(data.fecha_incidencia) }),
      ...(data.descripcion && { descripcion: data.descripcion }),
      ...(data.estado && { estado: data.estado }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
