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
      .innerJoin('usuario.rol', 'rol')
      .select(['usuario.id', 'usuario.correo', 'usuario.id_rol', 'usuario.nombres', 'usuario.apellidos', 'usuario.estado', 'usuario.id_sede', 'usuario.disponible'])
      .addSelect('usuario.contrasena')
      .addSelect('rol.nombre', 'rol_nombre')
      .where('usuario.correo = :correo', { correo })
      .getRawAndEntities();

    const entity = orm.entities[0];
    if (!entity) return null;
    return {
      id: entity.id,
      correo: entity.correo,
      contrasena: entity.contrasena,
      id_rol: entity.id_rol,
      nombre_rol: orm.raw[0].rol_nombre,
      nombres: entity.nombres,
      apellidos: entity.apellidos,
      estado: entity.estado,
      id_sede: entity.id_sede ?? null,
      disponible: entity.disponible,
    };
  }

  /**
   * Devuelve, por módulo, un mapa submódulo → acciones permitidas.
   * La clave '' representa "módulo completo" (todos los submódulos con esas acciones).
   * `acciones: []` en una entrada significa "todas las acciones" para ese submódulo.
   */
  async obtenerModulosPorUsuario(id_usuario: string): Promise<Record<string, Record<string, string[]>>> {
    const [directRows, roleRows] = await Promise.all([
      this.usuarioPermisosRepo
        .createQueryBuilder('up')
        .innerJoin(PermisosOrmEntity, 'p', 'p.id = up.id_permiso')
        .select('p.modulo', 'modulo')
        .addSelect('up.submodulos', 'submodulos')
        .where('up.id_usuario = :id_usuario', { id_usuario })
        .getRawMany<{ modulo: string; submodulos: string[] }>(),

      this.usuarioRepo
        .createQueryBuilder('u')
        .innerJoin(RolPermisosOrmEntity, 'rp', 'rp.id_rol = u.id_rol')
        .innerJoin(PermisosOrmEntity, 'p', 'p.id = rp.id_permiso')
        .select('p.modulo', 'modulo')
        .addSelect('rp.submodulo', 'submodulo')
        .addSelect('rp.acciones', 'acciones')
        .where('u.id = :id_usuario', { id_usuario })
        .getRawMany<{ modulo: string; submodulo: string; acciones: string[] }>(),
    ]);

    const parseArr = (val: any): string[] => {
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') {
        const trimmed = val.replace(/^\{|\}$/g, '');
        return trimmed ? trimmed.split(',') : [];
      }
      return [];
    };

    const result: Record<string, Record<string, string[]>> = {};

    // usuario_permisos: overrides directas por usuario, sin acciones propias (todas permitidas)
    for (const row of directRows) {
      if (!result[row.modulo]) result[row.modulo] = {};
      const subs = parseArr(row.submodulos);
      if (subs.length === 0) {
        if (!('' in result[row.modulo])) result[row.modulo][''] = [];
      } else {
        for (const s of subs) if (!(s in result[row.modulo])) result[row.modulo][s] = [];
      }
    }

    // rol_permisos: una fila por submódulo (o '' = módulo completo), cada una con sus acciones
    for (const row of roleRows) {
      if (!result[row.modulo]) result[row.modulo] = {};
      result[row.modulo][row.submodulo] = parseArr(row.acciones);
    }

    return result;
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
