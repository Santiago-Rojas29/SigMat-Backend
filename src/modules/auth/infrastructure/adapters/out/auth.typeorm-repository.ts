import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioOrmEntity } from '../../../../usuario/infrastructure/entities/usuario.orm-entity';
import { RolPermisosOrmEntity } from '../../../../rol_permisos/infrastructure/entities/rol_permisos.orm-entity';
import { PermisosOrmEntity } from '../../../../permisos/infrastructure/entities/permisos.orm-entity';
import type { AuthRepository } from '../../../domain/ports/auth.repository';
import { CredencialesUsuario } from 'src/modules/auth/domain/entities/auth.entity';

@Injectable()
export class AuthTypeOrmRepository implements AuthRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuarioRepo: Repository<UsuarioOrmEntity>,
    @InjectRepository(RolPermisosOrmEntity)
    private readonly rolPermisosRepo: Repository<RolPermisosOrmEntity>,
  ) {}

  async encontrarPorCorreo(correo: string): Promise<CredencialesUsuario | null> {
    const orm = await this.usuarioRepo
      .createQueryBuilder('usuario')
      .select(['usuario.id', 'usuario.correo', 'usuario.id_rol'])
      .addSelect('usuario.contrasena')
      .where('usuario.correo = :correo', { correo })
      .getOne();

    if (!orm) return null;
    return { id: orm.id, correo: orm.correo, contrasena: orm.contrasena, id_rol: orm.id_rol };
  }

  async obtenerModulosPorRol(id_rol: string): Promise<string[]> {
    const rows = await this.rolPermisosRepo
      .createQueryBuilder('rp')
      .innerJoin(PermisosOrmEntity, 'p', 'p.id = rp.id_permiso')
      .select('DISTINCT p.modulo', 'modulo')
      .where('rp.id_rol = :id_rol', { id_rol })
      .getRawMany<{ modulo: string }>();

    return rows.map((r) => r.modulo);
  }

  async guardarTokenReset(correo: string, token: string, expires: Date): Promise<void> {
    await this.usuarioRepo.update(
      { correo },
      { reset_token: token, reset_token_expires: expires },
    );
  }

  async encontrarPorTokenReset(token: string): Promise<{ id: string; correo: string } | null> {
    const orm = await this.usuarioRepo
      .createQueryBuilder('usuario')
      .select(['usuario.id', 'usuario.correo', 'usuario.reset_token_expires'])
      .addSelect('usuario.reset_token')
      .where('usuario.reset_token = :token', { token })
      .getOne();

    if (!orm) return null;
    if (!orm.reset_token_expires || orm.reset_token_expires < new Date()) return null;

    return { id: orm.id, correo: orm.correo };
  }

  async actualizarContrasena(id: string, hashContrasena: string): Promise<void> {
    await this.usuarioRepo.update({ id }, { contrasena: hashContrasena });
  }

  async limpiarTokenReset(id: string): Promise<void> {
    await this.usuarioRepo.update({ id }, { reset_token: null, reset_token_expires: null });
  }
}
