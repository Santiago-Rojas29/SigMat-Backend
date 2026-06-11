import { Inject, Injectable } from '@nestjs/common';
import type { SesionWhatsappRepository } from '../../domain/ports/sesion-whatsapp.repository';

@Injectable()
export class EliminarSesionWhatsappUseCase {
  constructor(
    @Inject('SesionWhatsappRepository')
    private readonly repo: SesionWhatsappRepository,
  ) {}

  async execute(telefono: string): Promise<void> {
    await this.repo.eliminar(telefono);
  }
}
