import { Injectable, Inject } from '@nestjs/common';
import type { LoteRepository } from '../../domain/ports/lote.repository';

@Injectable()
export class EliminarLoteUseCase {
  constructor(
    @Inject('LoteRepository')
    private readonly repo: LoteRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
