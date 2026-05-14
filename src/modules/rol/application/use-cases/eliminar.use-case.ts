import { Injectable, Inject } from '@nestjs/common';
import type { RolRepository } from '../../domain/ports/rol.repository';

@Injectable()
export class EliminarRolUseCase {
  constructor(
    @Inject('RolRepository')
    private readonly repo: RolRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
