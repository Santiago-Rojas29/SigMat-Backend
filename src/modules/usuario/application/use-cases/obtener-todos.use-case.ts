import { Injectable, Inject } from '@nestjs/common';
import { Usuario } from '../../domain/entities/usuario.entity';
import type { UsuarioRepository } from '../../domain/ports/usuario.repository';

@Injectable()
export class ObtenerTodosUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly repo: UsuarioRepository,
  ) {}

  async execute(): Promise<Usuario[]> {
    return this.repo.obtenerTodos();
  }
}
