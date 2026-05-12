import { Injectable, Inject } from '@nestjs/common';
import type { FichaUsuarioRepository } from '../../domain/ports/ficha_usuario.repository';

@Injectable()
export class EliminarFichaUsuarioUseCase {
  constructor(
    @Inject('FichaUsuarioRepository')
    private readonly repo: FichaUsuarioRepository,
  ) {}

  async execute(id_ficha: number, id_usuario: number): Promise<void> {
    await this.repo.eliminar(id_ficha, id_usuario);
  }
}
