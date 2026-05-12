import { Injectable, Inject } from '@nestjs/common';
import { FichaUsuario } from '../../domain/entities/ficha_usuario.entity';
import type { FichaUsuarioRepository } from '../../domain/ports/ficha_usuario.repository';

@Injectable()
export class ObtenerPorIdFichaUsuarioUseCase {
  constructor(
    @Inject('FichaUsuarioRepository')
    private readonly repo: FichaUsuarioRepository,
  ) {}

  async execute(id_ficha: number, id_usuario: number): Promise<FichaUsuario | null> {
    return this.repo.obtenerPorId(id_ficha, id_usuario);
  }
}
