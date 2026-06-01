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

    const result = await this.dataSource.query<{ id: string }[]>(
      `SELECT up.id
       FROM usuario_permisos up
       JOIN permisos p ON p.id = up.id_permiso
       WHERE up.id_usuario = $1
         AND p.modulo = $2
       ${submodulo ? 'AND (up.submodulos = \'{}\' OR $3 = ANY(up.submodulos))' : ''}
       LIMIT 1`,
      submodulo ? [user.id, modulo, submodulo] : [user.id, modulo],
    );

    if (result.length > 0) return true;

    if (!user.id_rol) return false;

    const rolResult = await this.dataSource.query<{ id: string }[]>(
      `SELECT rp.id_rol
       FROM rol_permisos rp
       JOIN permisos p ON p.id = rp.id_permiso
       WHERE rp.id_rol = $1
         AND p.modulo = $2
       LIMIT 1`,
      [user.id_rol, modulo],
    );

    return rolResult.length > 0;
  }
}
