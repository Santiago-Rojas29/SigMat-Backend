import { Module } from '@nestjs/common';
import { RebacService } from './rebac.service';
import { RebacGuard } from './rebac.guard';

@Module({
  providers: [RebacService, RebacGuard],
  exports: [RebacService, RebacGuard],
})
export class RebacModule {}
