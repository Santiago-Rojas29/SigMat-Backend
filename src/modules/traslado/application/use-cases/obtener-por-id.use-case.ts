import { Inject, Injectable } from '@nestjs/common';
import { Traslado } from '../../domain/entities/traslado.entity';
import type { TrasladoRepository } from '../../domain/ports/traslado.repository';

@Injectable()
export class ObtenerPorIdTrasladoUseCase {
  constructor(
    @Inject('TrasladoRepository')
    private readonly repo: TrasladoRepository,
  ) {}

  async execute(id: string): Promise<Traslado | null> {
    return this.repo.obtenerPorId(id);
  }
}
