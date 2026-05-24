import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioOrmEntity } from '../../../../usuario/infrastructure/entities/usuario.orm-entity';
import type { AuthRepository } from '../../../domain/ports/auth.repository';
import { CredencialesUsuario } from 'src/modules/auth/domain/entities/auth.entity';

@Injectable()
export class AuthTypeOrmRepository implements AuthRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repo: Repository<UsuarioOrmEntity>,
  ) {}

  async encontrarPorCorreo(correo: string): Promise<CredencialesUsuario | null> {
    const orm = await this.repo
      .createQueryBuilder('usuario')
      .select(['usuario.id', 'usuario.correo', 'usuario.id_rol'])
      .addSelect('usuario.contrasena')
      .where('usuario.correo = :correo', { correo })
      .getOne();

    if (!orm) return null;
    return { id: orm.id, correo: orm.correo, contrasena: orm.contrasena, id_rol: orm.id_rol };
  }
}
