import { Injectable, Inject } from '@nestjs/common';
import { Area } from '../../domain/entities/area.entity';
import type { AreaRepository } from '../../domain/ports/area.repository';

@Injectable()
export class ObtenerPorIdAreaUseCase {
  constructor(
    @Inject('AreaRepository')
    private readonly repo: AreaRepository,
  ) {}

  async execute(id: number): Promise<Area | null> {
    return this.repo.obtenerPorId(id);
  }
}
