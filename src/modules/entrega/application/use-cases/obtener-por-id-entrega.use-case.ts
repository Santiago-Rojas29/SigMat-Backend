import { Injectable, Inject } from '@nestjs/common';
import { Entrega } from '../../domain/entities/entrega.entity';
import type { EntregaRepository } from '../../domain/ports/entrega.repository';

@Injectable()
export class ObtenerPorIdEntregaUseCase {
  constructor(
    @Inject('EntregaRepository')
    private readonly repo: EntregaRepository,
  ) {}

  async execute(id: string): Promise<Entrega | null> {
    return this.repo.obtenerPorId(id);
  }
}
