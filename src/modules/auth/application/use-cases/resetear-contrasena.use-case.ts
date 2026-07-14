import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { AuthRepository } from '../../domain/ports/auth.repository';

@Injectable()
export class ResetearContrasenaUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly repo: AuthRepository,
  ) {}

  async execute(correo: string, codigo: string, nuevaContrasena: string): Promise<void> {
    const usuario = await this.repo.encontrarPorTokenReset(codigo);

    if (!usuario || usuario.correo !== correo) {
      throw new BadRequestException('El código es inválido o ha expirado.');
    }

    const hash = await bcrypt.hash(nuevaContrasena, 10);
    await this.repo.actualizarContrasena(usuario.id, hash);
    await this.repo.limpiarTokenReset(usuario.id);
  }
}
