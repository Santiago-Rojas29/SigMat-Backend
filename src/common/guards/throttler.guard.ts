import { Injectable, HttpException, HttpStatus, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  canActivate(context: ExecutionContext) {
    if (context.getType() !== 'http') return Promise.resolve(true);
    return super.canActivate(context);
  }

  protected throwThrottlingException(): Promise<void> {
    throw new HttpException(
      {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        error: 'Too Many Requests',
        mensaje: 'Has superado el límite de solicitudes. Espera un momento e intenta de nuevo.',
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
