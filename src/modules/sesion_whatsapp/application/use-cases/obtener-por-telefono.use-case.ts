import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { SesionWhatsappRepository } from '../../domain/ports/sesion-whatsapp.repository';
import { SesionWhatsapp } from '../../domain/entities/sesion-whatsapp.entity';

@Injectable()
export class ObtenerSesionPorTelefonoUseCase {
  constructor(
    @Inject('SesionWhatsappRepository')
    private readonly repo: SesionWhatsappRepository,
  ) {}

  async execute(telefono: string): Promise<SesionWhatsapp> {
    const sesion = await this.repo.obtenerPorTelefono(telefono);
    if (!sesion) throw new NotFoundException(`Sesión para ${telefono} no encontrada`);
    return sesion;
  }
}
