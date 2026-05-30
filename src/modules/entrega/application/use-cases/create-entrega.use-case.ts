import { Injectable, Inject } from '@nestjs/common';
import type { EntregaRepository } from '../../domain/ports/entrega.repository';
import { Entrega } from '../../domain/entities/entrega.entity';

@Injectable()
export class CreateEntregaUseCase {
  constructor(
    @Inject('EntregaRepository')
    private readonly repo: EntregaRepository,
  ) {}

  async execute(data: {
    id_prestamo: string;
    id_encargado: string;
    fecha_entrega: string;
    observaciones: string;
  }): Promise<Entrega> {
    const entity = new Entrega(
      "",
      data.id_prestamo,
      data.id_encargado,
      new Date(data.fecha_entrega),
      data.observaciones,
    );
    return this.repo.crear(entity);
  }
}
