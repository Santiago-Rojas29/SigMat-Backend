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
    const usuario = await this.usuarioRepo.findOne({
      where: { id: id_usuario },
      select: ['id', 'id_rol'],
    });

    const modulos = new Set<string>();

    const directos = await this.usuarioPermisosRepo
      .createQueryBuilder('up')
      .innerJoin(PermisosOrmEntity, 'p', 'p.id = up.id_permiso')
      .select('DISTINCT p.modulo', 'modulo')
      .where('up.id_usuario = :id_usuario', { id_usuario })
      .getRawMany<{ modulo: string }>();

    directos.forEach((r) => modulos.add(r.modulo));

    if (usuario?.id_rol) {
      const porRol = await this.usuarioPermisosRepo.manager
        .createQueryBuilder()
        .select('DISTINCT p.modulo', 'modulo')
        .from(RolPermisosOrmEntity, 'rp')
        .innerJoin(PermisosOrmEntity, 'p', 'p.id = rp.id_permiso')
        .where('rp.id_rol = :id_rol', { id_rol: usuario.id_rol })
        .getRawMany<{ modulo: string }>();

      porRol.forEach((r) => modulos.add(r.modulo));
    }

    return Array.from(modulos);
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
