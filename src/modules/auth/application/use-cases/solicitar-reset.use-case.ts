import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { AuthRepository } from '../../domain/ports/auth.repository';
import { MailService } from '../../infrastructure/services/mail.service';

@Injectable()
export class SolicitarResetUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly repo: AuthRepository,
    private readonly mail: MailService,
  ) {}

  async execute(correo: string): Promise<void> {
    const usuario = await this.repo.encontrarPorCorreo(correo);
    if (!usuario) throw new NotFoundException('No existe una cuenta con ese correo.');

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await this.repo.guardarTokenReset(correo, codigo, expires);
    await this.mail.enviarCodigoReset(correo, codigo);
  }
}
