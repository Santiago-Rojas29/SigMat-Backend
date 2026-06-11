import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PERMISSION_KEY, PermissionRequirement } from '../decorators/require-permission.decorator';

interface JwtUser {
  id: string;
  correo: string;
  id_rol: string;
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requirement = this.reflector.getAllAndOverride<PermissionRequirement>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requirement) return true;

    const request = context.switchToHttp().getRequest<{ user?: JwtUser }>();
    const user = request.user;
    if (!user?.id) return false;

    const { modulo, submodulo } = requirement;

    if (submodulo) {
      const result = await this.dataSource.query<{ id: string }[]>(
        `SELECT rp.id
         FROM usuario u
         JOIN rol_permisos rp ON rp.id_rol = u.id_rol
         JOIN permisos p ON p.id = rp.id_permiso
         WHERE u.id = $1
           AND p.modulo = $2
           AND (rp.submodulos = '{}' OR $3 = ANY(rp.submodulos))
         LIMIT 1`,
        [user.id, modulo, submodulo],
      );
      return result.length > 0;
    }

    const result = await this.dataSource.query<{ id: string }[]>(
      `SELECT rp.id
       FROM usuario u
       JOIN rol_permisos rp ON rp.id_rol = u.id_rol
       JOIN permisos p ON p.id = rp.id_permiso
       WHERE u.id = $1
         AND p.modulo = $2
       LIMIT 1`,
      [user.id, modulo],
    );
    return result.length > 0;
  }
}
