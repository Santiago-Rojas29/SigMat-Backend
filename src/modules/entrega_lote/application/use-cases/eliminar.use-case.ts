import { Injectable, Inject } from '@nestjs/common';
import type { EntregaLoteRepository } from '../../domain/ports/entrega_lote.repository';

@Injectable()
export class EliminarEntregaLoteUseCase {
  constructor(
    @Inject('EntregaLoteRepository')
    private readonly repo: EntregaLoteRepository,
  ) {}

  async execute(id_entrega: string, id_lote: string): Promise<void> {
    await this.repo.eliminar(id_entrega, id_lote);
  }
}
