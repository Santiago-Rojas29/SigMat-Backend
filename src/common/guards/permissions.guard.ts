import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PERMISSION_KEY } from '../decorators/require-permission.decorator';

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
    const requiredModule = this.reflector.getAllAndOverride<string>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Sin decorator → ruta pública o solo requiere JWT
    if (!requiredModule) return true;

    const request = context.switchToHttp().getRequest<{ user?: JwtUser }>();
    const user = request.user;

    if (!user?.id_rol) return false;

    const result = await this.dataSource.query<{ modulo: string }[]>(
      `SELECT p.modulo
       FROM rol_permisos rp
       JOIN permisos p ON p.id = rp.id_permiso
       WHERE rp.id_rol = $1 AND p.modulo = $2
       LIMIT 1`,
      [user.id_rol, requiredModule],
    );

    return result.length > 0;
  }
}
