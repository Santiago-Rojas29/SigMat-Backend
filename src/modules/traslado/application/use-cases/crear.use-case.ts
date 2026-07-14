import { Inject, Injectable } from '@nestjs/common';
import { Traslado } from '../../domain/entities/traslado.entity';
import type { TrasladoRepository } from '../../domain/ports/traslado.repository';

@Injectable()
export class CrearTrasladoUseCase {
  constructor(
    @Inject('TrasladoRepository')
    private readonly repo: TrasladoRepository,
  ) {}

  async execute(data: {
    id_responsable: string;
    id_ubicacion_origen: string;
    id_ubicacion_destino: string;
    fecha_traslado: string;
    motivo: string;
    observaciones: string;
  }): Promise<Traslado> {
    const entity = new Traslado(
      '',
      data.id_responsable,
      data.id_ubicacion_origen,
      data.id_ubicacion_destino,
      new Date(data.fecha_traslado),
      data.motivo,
      data.observaciones,
    );
    entity.validar();
    return this.repo.crear(entity);
  }
}
