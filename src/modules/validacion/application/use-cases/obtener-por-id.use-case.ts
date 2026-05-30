import { Injectable, Inject } from '@nestjs/common';
import { Validacion } from '../../domain/entities/validacion.entity';
import type { ValidacionRepository } from '../../domain/ports/validacion.repository';

@Injectable()
export class ObtenerValidacionPorIdUseCase {
  constructor(
    @Inject('ValidacionRepository')
    private readonly repo: ValidacionRepository,
  ) {}

  async execute(id: string): Promise<Validacion | null> {
    return this.repo.obtenerPorId(id);
  }
}
