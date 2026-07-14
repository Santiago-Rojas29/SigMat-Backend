import { Inject, Injectable } from '@nestjs/common';
import { Kardex } from '../../domain/entities/kardex.entity';
import type { KardexRepository } from '../../domain/ports/kardex.repository';

@Injectable()
export class ObtenerPorIdKardexUseCase {
  constructor(
    @Inject('KardexRepository')
    private readonly repo: KardexRepository,
  ) {}

  async execute(id: string): Promise<Kardex | null> {
    return this.repo.obtenerPorId(id);
  }
}
