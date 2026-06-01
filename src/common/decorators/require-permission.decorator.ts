import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'required_permission';

export interface PermissionRequirement {
  modulo: string;
  submodulo?: string;
}

export const RequirePermission = (modulo: string, submodulo?: string) =>
  SetMetadata(PERMISSION_KEY, { modulo, submodulo } as PermissionRequirement);
