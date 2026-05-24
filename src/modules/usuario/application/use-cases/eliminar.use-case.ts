import { Injectable, Inject } from '@nestjs/common';
import type { UsuarioRepository } from '../../domain/ports/usuario.repository';

@Injectable()
export class EliminarUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly repo: UsuarioRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.eliminar(id);
  }
}
