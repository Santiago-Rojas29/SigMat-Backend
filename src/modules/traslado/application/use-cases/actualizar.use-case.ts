import { Inject, Injectable } from '@nestjs/common';
import { Traslado } from '../../domain/entities/traslado.entity';
import type { TrasladoRepository } from '../../domain/ports/traslado.repository';

@Injectable()
export class ActualizarTrasladoUseCase {
  constructor(
    @Inject('TrasladoRepository')
    private readonly repo: TrasladoRepository,
  ) {}

  async execute(
    id: string,
    data: {
      id_responsable?: string;
      id_ubicacion_origen?: string;
      id_ubicacion_destino?: string;
      fecha_traslado?: string;
      motivo?: string;
      observaciones?: string;
    },
  ): Promise<Traslado> {
    const mapped: Partial<Traslado> = {
      ...(data.id_responsable && { id_responsable: data.id_responsable }),
      ...(data.id_ubicacion_origen && { id_ubicacion_origen: data.id_ubicacion_origen }),
      ...(data.id_ubicacion_destino && { id_ubicacion_destino: data.id_ubicacion_destino }),
      ...(data.fecha_traslado && { fecha_traslado: new Date(data.fecha_traslado) }),
      ...(data.motivo && { motivo: data.motivo }),
      ...(data.observaciones && { observaciones: data.observaciones }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
