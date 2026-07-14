import { Injectable, Inject } from '@nestjs/common';
import type { ValidacionRepository } from '../../domain/ports/validacion.repository';

@Injectable()
export class EliminarValidacionUseCase {
  constructor(
    @Inject('ValidacionRepository')
    private readonly repo: ValidacionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
