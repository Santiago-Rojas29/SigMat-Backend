import { Inject, Injectable } from '@nestjs/common';
import type { SesionWhatsappRepository } from '../../domain/ports/sesion-whatsapp.repository';
import { SesionWhatsapp } from '../../domain/entities/sesion-whatsapp.entity';

@Injectable()
export class UpsertSesionWhatsappUseCase {
  constructor(
    @Inject('SesionWhatsappRepository')
    private readonly repo: SesionWhatsappRepository,
  ) {}

  async execute(
    telefono: string,
    data: Partial<Omit<SesionWhatsapp, 'telefono' | 'actualizado_en'>>,
  ): Promise<SesionWhatsapp> {
    return this.repo.upsert(telefono, data);
  }
}
