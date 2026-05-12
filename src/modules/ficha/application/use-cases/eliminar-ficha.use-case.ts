import { Injectable, Inject } from '@nestjs/common';
import type { FichaRepository } from '../../domain/ports/ficha.repository';

@Injectable()
export class EliminarFichaUseCase {
  constructor(
    @Inject('FichaRepository')
    private readonly repo: FichaRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.eliminar(id);
  }
}
