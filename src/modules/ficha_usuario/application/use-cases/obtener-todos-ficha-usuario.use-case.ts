import { Injectable, Inject } from '@nestjs/common';
import { FichaUsuario } from '../../domain/entities/ficha_usuario.entity';
import type { FichaUsuarioRepository } from '../../domain/ports/ficha_usuario.repository';

@Injectable()
export class ObtenerTodosFichaUsuarioUseCase {
  constructor(
    @Inject('FichaUsuarioRepository')
    private readonly repo: FichaUsuarioRepository,
  ) { }

  async execute(): Promise<FichaUsuario[]> {
    return this.repo.obtenerTodos();
  }
}
