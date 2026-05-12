import { Injectable, Inject } from '@nestjs/common';
import { EntregaUnidad } from '../../domain/entities/entrega_unidad.entity';
import type { EntregaUnidadRepository } from '../../domain/ports/entrega_unidad.repository';

@Injectable()
export class CreateEntregaUnidadUseCase {
  constructor(
    @Inject('EntregaUnidadRepository')
    private readonly repo: EntregaUnidadRepository,
  ) {}

  async execute(data: { id_entrega: string; id_unidad: string }): Promise<EntregaUnidad> {
    const entregaUnidad = new EntregaUnidad(data.id_entrega, data.id_unidad);
    entregaUnidad.validar();
    return this.repo.crear(entregaUnidad);
  }
}
