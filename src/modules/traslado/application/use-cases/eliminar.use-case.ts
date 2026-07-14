import { Inject, Injectable } from '@nestjs/common';
import type { TrasladoRepository } from '../../domain/ports/traslado.repository';

@Injectable()
export class EliminarTrasladoUseCase {
  constructor(
    @Inject('TrasladoRepository')
    private readonly repo: TrasladoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
