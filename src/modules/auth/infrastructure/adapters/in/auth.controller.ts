import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../common/guards/jwt-auth.guard';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';
import { ObtenerMisPermisosUseCase } from '../../../application/use-cases/obtener-mis-permisos.use-case';
import { LoginDto } from './dto/login.dto';

interface JwtRequest {
  user: { id: string; correo: string; id_rol: string };
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly misPermisosUseCase: ObtenerMisPermisosUseCase,
  ) {}

  @Post('login')
  login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
    return this.loginUseCase.execute(dto.correo, dto.contrasena);
  }

  @Get('permisos')
  @UseGuards(JwtAuthGuard)
  misPermisos(@Request() req: JwtRequest): Promise<{ modulos: string[] }> {
    return this.misPermisosUseCase.execute(req.user.id_rol);
  }
}
