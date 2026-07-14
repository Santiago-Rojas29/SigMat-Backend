import { Injectable, Inject } from '@nestjs/common';
import type { MaterialRepository } from '../../domain/ports/material.repository';

@Injectable()
export class EliminarMaterialUseCase {
  constructor(
    @Inject('MaterialRepository')
    private readonly repo: MaterialRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
