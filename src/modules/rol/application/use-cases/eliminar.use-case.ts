import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { RolRepository } from '../../domain/ports/rol.repository';

@Injectable()
export class EliminarRolUseCase {
  constructor(
    @Inject('RolRepository')
    private readonly repo: RolRepository,
    @InjectDataSource() private readonly db: DataSource,
  ) {}

  async execute(id: string): Promise<void> {
    const [usuarioConRol] = await this.db.query(
      `SELECT id FROM usuario WHERE id_rol = $1 LIMIT 1`, [id],
    );
    if (usuarioConRol) {
      throw new BadRequestException('No se puede eliminar este rol porque hay usuarios asignados a él. Reasígnalos primero.');
    }

    await this.db.query(`DELETE FROM rol_permisos WHERE id_rol = $1`, [id]);
    await this.repo.eliminar(id);
  }
}
