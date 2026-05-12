import { Injectable, Inject } from '@nestjs/common';
import { Sede } from '../../domain/entities/sede.entity';
import type { SedeRepository } from '../../domain/ports/sede.repository';

@Injectable()
export class ObtenerPorIdSedeUseCase {
  constructor(
    @Inject('SedeRepository')
    private readonly repo: SedeRepository,
  ) {}

  async execute(id: number): Promise<Sede | null> {
    return this.repo.obtenerPorId(id);
  }
}
