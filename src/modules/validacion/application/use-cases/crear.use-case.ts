import { Injectable, Inject } from '@nestjs/common';
import { Validacion, DecisionValidacion } from '../../domain/entities/validacion.entity';
import type { ValidacionRepository } from '../../domain/ports/validacion.repository';

@Injectable()
export class CreateValidacionUseCase {
  constructor(
    @Inject('ValidacionRepository')
    private readonly repo: ValidacionRepository,
  ) {}

  async execute(data: { id_solicitud: string; id_validador: string; fecha_validacion: string; decision: string; observaciones: string }): Promise<Validacion> {
    const validacion = new Validacion('', data.id_solicitud, data.id_validador, new Date(data.fecha_validacion), data.decision as DecisionValidacion, data.observaciones);
    validacion.validar();
    return this.repo.crear(validacion);
  }
}
