import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REBAC_KEY, Relacion } from './rebac.decorator';
import { RebacService } from './rebac.service';

/**
 * Módulos que otorgan acceso administrativo.
 * Usuarios con estos permisos bypasean el check de relación REBAC
 * y pueden acceder a cualquier recurso (administradores, bodega, control).
 */
const MODULOS_ADMIN = ['administracion', 'movimientos', 'control'];

/**
 * Guard REBAC — Relationship-Based Access Control.
 *
 * Funciona en conjunto con @RequiereRelacion():
 * 1. Si el endpoint no tiene @RequiereRelacion → pasa sin restricción.
 * 2. Si el usuario tiene permisos de módulo administrativo → pasa (bypass).
 * 3. Si no → verifica que el usuario tenga la relación declarada con el recurso.
 *
 * Requiere que JwtAuthGuard haya corrido antes para poblar request.user.
 */
@Injectable()
export class RebacGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rebacService: RebacService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const relacion = this.reflector.get<Relacion>(REBAC_KEY, context.getHandler());

    // Sin decorador → el endpoint no requiere check REBAC
    if (!relacion) return true;

    const request = context.switchToHttp().getRequest();
    const userId: string = request.user?.id;
    const resourceId: string = request.params?.id;

    if (!userId || !resourceId) return false;

    // Bypass: administradores y personal con permisos de módulo pasan directo
    const esAdmin = await this.rebacService.tienePermisoDeModulo(userId, MODULOS_ADMIN);
    if (esAdmin) return true;

    // Verificación de relación usuario → recurso
    const tieneRelacion = await this.rebacService.verificar(relacion, userId, resourceId);

    if (!tieneRelacion) {
      throw new ForbiddenException(
        'No tienes una relación con este recurso que te permita realizar esta acción.',
      );
    }

    return true;
  }
}
