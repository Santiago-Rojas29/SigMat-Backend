import { Injectable, Inject } from '@nestjs/common';
import type { EntregaRepository } from '../../domain/ports/entrega.repository';

@Injectable()
export class EliminarEntregaUseCase {
  constructor(
    @Inject('EntregaRepository')
    private readonly repo: EntregaRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
