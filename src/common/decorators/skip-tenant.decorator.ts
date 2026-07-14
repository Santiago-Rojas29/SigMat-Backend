import { SetMetadata } from '@nestjs/common';
import { SKIP_TENANT } from '../guards/tenant.guard';

export const SkipTenant = () => SetMetadata(SKIP_TENANT, true);
