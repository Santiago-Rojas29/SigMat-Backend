import { Injectable, Inject } from '@nestjs/common';
import type { AreaRepository } from '../../domain/ports/area.repository';

@Injectable()
export class EliminarAreaUseCase {
  constructor(
    @Inject('AreaRepository')
    private readonly repo: AreaRepository,
  ) { }

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
