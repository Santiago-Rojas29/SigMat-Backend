import { Injectable, Inject, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { AuthRepository } from '../../domain/ports/auth.repository';
import { EstadoUsuario } from '../../../usuario/domain/entities/usuario.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly repo: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(correo: string, contrasena: string): Promise<{ access_token: string }> {
    const usuario = await this.repo.encontrarPorCorreo(correo);
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValida) throw new UnauthorizedException('Credenciales inválidas');

    if (usuario.estado !== EstadoUsuario.ACTIVO) {
      throw new ForbiddenException('Tu cuenta está inactiva. Contacta al administrador.');
    }

    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
      id_rol: usuario.id_rol,
      nombre_rol: usuario.nombre_rol,
      id_sede: usuario.id_sede,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      disponible: usuario.disponible,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
