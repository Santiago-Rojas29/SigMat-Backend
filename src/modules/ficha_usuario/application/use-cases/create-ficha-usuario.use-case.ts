import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { FichaUsuarioRepository } from '../../domain/ports/ficha_usuario.repository';
import { FichaUsuario } from '../../domain/entities/ficha_usuario.entity';

@Injectable()
export class CreateFichaUsuarioUseCase {
  constructor(
    @Inject('FichaUsuarioRepository')
    private readonly repo: FichaUsuarioRepository,
    @InjectDataSource() private readonly db: DataSource,
  ) { }

  async execute(data: {
    id_ficha: string;
    id_usuario: string;
    rol_en_ficha: string;
  }): Promise<FichaUsuario> {
    if (data.rol_en_ficha === 'instructor') {
      const [existing] = await this.db.query<{ id_ficha: string }[]>(
        `SELECT id_ficha FROM ficha_usuario WHERE id_ficha = $1 AND rol_en_ficha = 'instructor' LIMIT 1`,
        [data.id_ficha],
      );
      if (existing) throw new BadRequestException('Esta ficha ya tiene un Instructor líder asignado');
    }
    const entity = new FichaUsuario(data.id_ficha, data.id_usuario, data.rol_en_ficha);
    entity.validar();
    return this.repo.crear(entity);
  }
}
