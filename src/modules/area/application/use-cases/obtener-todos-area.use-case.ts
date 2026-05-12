import { Injectable, Inject } from '@nestjs/common';
import { Area } from '../../domain/entities/area.entity';
import type { AreaRepository } from '../../domain/ports/area.repository';

@Injectable()
export class ObtenerTodosAreaUseCase {
  constructor(
    @Inject('AreaRepository')
    private readonly repo: AreaRepository,
  ) {}

  async execute(): Promise<Area[]> {
    return this.repo.obtenerTodos();
  }
}
