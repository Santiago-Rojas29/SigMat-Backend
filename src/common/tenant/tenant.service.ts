import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class TenantService {
  private readonly als = new AsyncLocalStorage<string | null>();

  run<T>(tenantId: string | null, fn: () => T): T {
    return this.als.run(tenantId, fn);
  }

  get tenantId(): string | null {
    return this.als.getStore() ?? null;
  }

  get isRoot(): boolean {
    return this.als.getStore() === null;
  }
}
