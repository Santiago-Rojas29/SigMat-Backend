import { Injectable, Inject } from '@nestjs/common';
import { Ficha } from '../../domain/entities/ficha.entity';
import type { FichaRepository } from '../../domain/ports/ficha.repository';

@Injectable()
export class ObtenerPorIdFichaUseCase {
  constructor(
    @Inject('FichaRepository')
    private readonly repo: FichaRepository,
  ) { }

  async execute(id: string): Promise<Ficha | null> {
    return this.repo.obtenerPorId(id);
  }
}
