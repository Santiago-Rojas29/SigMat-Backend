import { Inject, Injectable } from '@nestjs/common';
import type { KardexRepository } from '../../domain/ports/kardex.repository';

@Injectable()
export class EliminarKardexUseCase {
  constructor(
    @Inject('KardexRepository')
    private readonly repo: KardexRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
