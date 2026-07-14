import { Injectable, Inject } from '@nestjs/common';
import { Entrega } from '../../domain/entities/entrega.entity';
import type { EntregaRepository } from '../../domain/ports/entrega.repository';

@Injectable()
export class ActualizarEntregaUseCase {
  constructor(
    @Inject('EntregaRepository')
    private readonly repo: EntregaRepository,
  ) {}

  async execute(
    id: string,
    data: {
      id_prestamo?: string;
      id_encargado?: string;
      fecha_entrega?: string;
      observaciones?: string;
    },
  ): Promise<Entrega> {
    const mapped: Partial<Entrega> = {
      ...(data.id_prestamo !== undefined && { id_prestamo: data.id_prestamo }),
      ...(data.id_encargado !== undefined && { id_encargado: data.id_encargado }),
      ...(data.fecha_entrega !== undefined && { fecha_entrega: new Date(data.fecha_entrega) }),
      ...(data.observaciones !== undefined && { observaciones: data.observaciones }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
