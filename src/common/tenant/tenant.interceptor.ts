import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantService } from './tenant.service';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(private readonly tenant: TenantService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const tenantId: string | null = req.user?.id_sede ?? null;

    return new Observable((subscriber) => {
      this.tenant.run(tenantId, () => {
        next.handle().subscribe(subscriber);
      });
    });
  }
}
