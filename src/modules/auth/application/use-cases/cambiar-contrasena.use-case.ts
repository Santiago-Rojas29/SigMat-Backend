import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { AuthRepository } from '../../domain/ports/auth.repository';

@Injectable()
export class CambiarContrasenaUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly repo: AuthRepository,
  ) {}

  async execute(correo: string, contrasenaActual: string, nuevaContrasena: string): Promise<void> {
    const usuario = await this.repo.encontrarPorCorreo(correo);
    if (!usuario) throw new UnauthorizedException('Usuario no encontrado.');

    const valida = await bcrypt.compare(contrasenaActual, usuario.contrasena);
    if (!valida) throw new UnauthorizedException('La contraseña actual es incorrecta.');

    const hash = await bcrypt.hash(nuevaContrasena, 10);
    await this.repo.actualizarContrasena(usuario.id, hash);
  }
}
