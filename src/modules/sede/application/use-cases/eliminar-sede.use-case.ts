import { Injectable, Inject } from '@nestjs/common';
import type { SedeRepository } from '../../domain/ports/sede.repository';

@Injectable()
export class EliminarSedeUseCase {
  constructor(
    @Inject('SedeRepository')
    private readonly repo: SedeRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.eliminar(id);
  }
}
