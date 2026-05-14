import { Injectable, Inject } from '@nestjs/common';
import type { FichaUsuarioRepository } from '../../domain/ports/ficha_usuario.repository';
import { FichaUsuario } from '../../domain/entities/ficha_usuario.entity';

@Injectable()
export class CreateFichaUsuarioUseCase {
  constructor(
    @Inject('FichaUsuarioRepository')
    private readonly repo: FichaUsuarioRepository,
  ) { }

  async execute(data: {
    id_ficha: string;
    id_usuario: string;
    rol_en_ficha: string;
  }): Promise<FichaUsuario> {
    const entity = new FichaUsuario(
      data.id_ficha,
      data.id_usuario,
      data.rol_en_ficha,
    );
    return this.repo.crear(entity);
  }
}
