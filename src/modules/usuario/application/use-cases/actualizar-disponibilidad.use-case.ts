import { Injectable, Inject } from '@nestjs/common';
import { Usuario } from '../../domain/entities/usuario.entity';
import type { UsuarioRepository } from '../../domain/ports/usuario.repository';

@Injectable()
export class ActualizarDisponibilidadUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly repo: UsuarioRepository,
  ) {}

  execute(id: string, disponible: boolean): Promise<Usuario> {
    return this.repo.actualizar(id, { disponible });
  }
}
