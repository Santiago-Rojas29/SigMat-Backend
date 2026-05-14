import { Injectable, Inject } from '@nestjs/common';
import { Validacion, DecisionValidacion } from '../../domain/entities/validacion.entity';
import type { ValidacionRepository } from '../../domain/ports/validacion.repository';

@Injectable()
export class ActualizarValidacionUseCase {
    constructor(
        @Inject('ValidacionRepository')
        private readonly repo: ValidacionRepository,
    ) {}

  async execute(
    id: string,
    data: {
      id_solicitud?: string;
      id_validador?: string;
      fecha_validacion?: string;
      decision?: DecisionValidacion;
      observaciones?: string;
    },
  ): Promise<Validacion> {
    const mapped: Partial<Validacion> = {
      ...(data.id_solicitud && { id_solicitud: data.id_solicitud }),
      ...(data.id_validador && { id_validador: data.id_validador }),
      ...(data.fecha_validacion && {
        fecha_validacion: new Date(data.fecha_validacion),
      }),
      ...(data.decision && { decision: data.decision }),
      ...(data.observaciones && { observaciones: data.observaciones }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
