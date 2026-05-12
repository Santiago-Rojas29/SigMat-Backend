import { Injectable, Inject } from '@nestjs/common';
import { FichaUsuario } from '../../domain/entities/ficha_usuario.entity';
import type { FichaUsuarioRepository } from '../../domain/ports/ficha_usuario.repository';

@Injectable()
export class ActualizarFichaUsuarioUseCase {
  constructor(
    @Inject('FichaUsuarioRepository')
    private readonly repo: FichaUsuarioRepository,
  ) {}

  async execute(
    id_ficha: number,
    id_usuario: number,
    data: {
      rol_en_ficha?: string;
    },
  ): Promise<FichaUsuario> {
    const mapped: Partial<FichaUsuario> = { ...data };
    return this.repo.actualizar(id_ficha, id_usuario, mapped);
  }
}
