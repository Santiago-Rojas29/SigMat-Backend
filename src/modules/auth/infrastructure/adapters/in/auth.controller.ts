import { Controller, Post, Get, Body, Request, UseGuards, HttpCode } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';
import { ObtenerMisPermisosUseCase } from '../../../application/use-cases/obtener-mis-permisos.use-case';
import { SolicitarResetUseCase } from '../../../application/use-cases/solicitar-reset.use-case';
import { ResetearContrasenaUseCase } from '../../../application/use-cases/resetear-contrasena.use-case';
import { CambiarContrasenaUseCase } from '../../../application/use-cases/cambiar-contrasena.use-case';
import { LoginDto } from './dto/login.dto';
import { SolicitarResetDto } from './dto/solicitar-reset.dto';
import { ResetearContrasenaDto } from './dto/resetear-contrasena.dto';
import { CambiarContrasenaDto } from './dto/cambiar-contrasena.dto';

interface JwtRequest {
  user: { id: string; correo: string; id_rol: string };
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly misPermisosUseCase: ObtenerMisPermisosUseCase,
    private readonly solicitarResetUseCase: SolicitarResetUseCase,
    private readonly resetearContrasenaUseCase: ResetearContrasenaUseCase,
    private readonly cambiarContrasenaUseCase: CambiarContrasenaUseCase,
  ) {}

  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('login')
  login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
    return this.loginUseCase.execute(dto.correo, dto.contrasena);
  }

  @SkipThrottle()
  @Get('permisos')
  @UseGuards(JwtAuthGuard)
  misPermisos(@Request() req: JwtRequest): Promise<{ modulos: Record<string, Record<string, string[]>> }> {
    return this.misPermisosUseCase.execute(req.user.id);
  }

  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @Post('solicitar-reset')
  @HttpCode(200)
  async solicitarReset(@Body() dto: SolicitarResetDto): Promise<{ mensaje: string }> {
    await this.solicitarResetUseCase.execute(dto.correo);
    return { mensaje: 'Se envió un código de 6 dígitos a tu correo. Expira en 15 minutos.' };
  }

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('resetear-contrasena')
  @HttpCode(200)
  async resetearContrasena(@Body() dto: ResetearContrasenaDto): Promise<{ mensaje: string }> {
    await this.resetearContrasenaUseCase.execute(dto.correo, dto.codigo, dto.nueva_contrasena);
    return { mensaje: 'Contraseña actualizada correctamente.' };
  }

  @SkipThrottle()
  @Post('cambiar-contrasena')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async cambiarContrasena(
    @Request() req: JwtRequest,
    @Body() dto: CambiarContrasenaDto,
  ): Promise<{ mensaje: string }> {
    await this.cambiarContrasenaUseCase.execute(req.user.correo, dto.contrasena_actual, dto.nueva_contrasena);
    return { mensaje: 'Contraseña actualizada correctamente.' };
  }
}
