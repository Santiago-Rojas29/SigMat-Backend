import { Injectable, Inject } from '@nestjs/common';
import { Material } from '../../domain/entities/material.entity';
import type { MaterialRepository } from '../../domain/ports/material.repository';

@Injectable()
export class ObtenerPorIdMaterialUseCase {
  constructor(
    @Inject('MaterialRepository')
    private readonly repo: MaterialRepository,
  ) {}

  async execute(id: string): Promise<Material | null> {
    return this.repo.obtenerPorId(id);
  }
}
