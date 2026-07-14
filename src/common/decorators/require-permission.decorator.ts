import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'required_permission';

export interface PermissionRequirement {
  modulo: string;
  submodulo?: string;
  accion?: string;
}

export const RequirePermission = (modulo: string, submodulo?: string, accion?: string) =>
  SetMetadata(PERMISSION_KEY, { modulo, submodulo, accion } as PermissionRequirement);
