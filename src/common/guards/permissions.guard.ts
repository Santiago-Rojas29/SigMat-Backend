import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PERMISSION_KEY, PermissionRequirement } from '../decorators/require-permission.decorator';

interface JwtUser {
  id: string;
  correo: string;
  id_rol: string;
  nombre_rol: string;
  id_sede: string | null;
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

    // Solo Root omite la verificación de permisos. Un usuario común sin sede
    // asignada NO debe heredar ese bypass: se evalúa como cualquier otro.
    if (user.nombre_rol === 'Root') return true;

    const { modulo, submodulo, accion } = requirement;

    // Prioriza la fila del submódulo específico sobre la del módulo completo ('')
    // cuando ambas existieran para el mismo rol+módulo.
    const result: { acciones: string[] }[] = await this.dataSource.query(
      `SELECT rp.acciones
       FROM usuario u
       JOIN rol_permisos rp ON rp.id_rol = u.id_rol
       JOIN permisos p ON p.id = rp.id_permiso
       WHERE u.id = $1
         AND p.modulo = $2
         AND (rp.submodulo = '' OR rp.submodulo = $3)
       ORDER BY (rp.submodulo = $3) DESC
       LIMIT 1`,
      [user.id, modulo, submodulo ?? ''],
    );

    if (result.length === 0) return false;
    if (!accion) return true;

    const acciones = result[0].acciones ?? [];
    return acciones.length === 0 || acciones.includes(accion);
  }
}
