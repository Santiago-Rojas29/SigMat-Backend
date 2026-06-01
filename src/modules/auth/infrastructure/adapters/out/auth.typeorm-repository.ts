import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioOrmEntity } from '../../../../usuario/infrastructure/entities/usuario.orm-entity';
import { UsuarioPermisosOrmEntity } from '../../../../usuario_permisos/infrastructure/entities/usuario_permisos.orm-entity';
import { PermisosOrmEntity } from '../../../../permisos/infrastructure/entities/permisos.orm-entity';
import { RolPermisosOrmEntity } from '../../../../rol_permisos/infrastructure/entities/rol_permisos.orm-entity';
import type { AuthRepository } from '../../../domain/ports/auth.repository';
import { CredencialesUsuario } from 'src/modules/auth/domain/entities/auth.entity';

@Injectable()
export class AuthTypeOrmRepository implements AuthRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuarioRepo: Repository<UsuarioOrmEntity>,
    @InjectRepository(UsuarioPermisosOrmEntity)
    private readonly usuarioPermisosRepo: Repository<UsuarioPermisosOrmEntity>,
  ) {}

  async encontrarPorCorreo(correo: string): Promise<CredencialesUsuario | null> {
    const orm = await this.usuarioRepo
      .createQueryBuilder('usuario')
      .select(['usuario.id', 'usuario.correo', 'usuario.id_rol', 'usuario.nombres', 'usuario.apellidos'])
      .addSelect('usuario.contrasena')
      .where('usuario.correo = :correo', { correo })
      .getOne();

    if (!orm) return null;
    return {
      id: orm.id,
      correo: orm.correo,
      contrasena: orm.contrasena,
      id_rol: orm.id_rol,
      nombres: orm.nombres,
      apellidos: orm.apellidos,
    };
  }

  async obtenerModulosPorUsuario(id_usuario: string): Promise<string[]> {
    const [directRows, roleRows] = await Promise.all([
      // Permisos asignados directamente al usuario
      this.usuarioPermisosRepo
        .createQueryBuilder('up')
        .innerJoin(PermisosOrmEntity, 'p', 'p.id = up.id_permiso')
        .select('DISTINCT p.modulo', 'modulo')
        .where('up.id_usuario = :id_usuario', { id_usuario })
        .getRawMany<{ modulo: string }>(),

      // Permisos heredados del rol del usuario
      this.usuarioRepo
        .createQueryBuilder('u')
        .innerJoin(RolPermisosOrmEntity, 'rp', 'rp.id_rol = u.id_rol')
        .innerJoin(PermisosOrmEntity, 'p', 'p.id = rp.id_permiso')
        .select('DISTINCT p.modulo', 'modulo')
        .where('u.id = :id_usuario', { id_usuario })
        .getRawMany<{ modulo: string }>(),
    ]);

    const modulos = new Set([
      ...directRows.map((r) => r.modulo),
      ...roleRows.map((r) => r.modulo),
    ]);

    return [...modulos];
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
