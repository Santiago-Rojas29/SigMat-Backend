import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'required_permission';
export const RequirePermission = (modulo: string) =>
  SetMetadata(PERMISSION_KEY, modulo);
