import { Injectable, Inject } from '@nestjs/common';
import { Material } from '../../domain/entities/material.entity';
import type { MaterialRepository } from '../../domain/ports/material.repository';

@Injectable()
export class ObtenerTodosMaterialUseCase {
  constructor(
    @Inject('MaterialRepository')
    private readonly repo: MaterialRepository,
  ) {}

  async execute(): Promise<Material[]> {
    return this.repo.obtenerTodos();
  }
}
