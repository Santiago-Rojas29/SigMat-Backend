import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SesionWhatsapp } from '../../../domain/entities/sesion-whatsapp.entity';
import { SesionWhatsappRepository } from '../../../domain/ports/sesion-whatsapp.repository';
import { SesionWhatsappOrmEntity } from '../../entities/sesion-whatsapp.orm-entity';

@Injectable()
export class SesionWhatsappTypeOrmRepository implements SesionWhatsappRepository {
  constructor(
    @InjectRepository(SesionWhatsappOrmEntity)
    private readonly repo: Repository<SesionWhatsappOrmEntity>,
  ) {}

  private toEntity(orm: SesionWhatsappOrmEntity): SesionWhatsapp {
    return new SesionWhatsapp(
      orm.telefono,
      orm.token,
      orm.paso,
      orm.correo,
      orm.id_usuario,
      orm.nombres,
      orm.apellidos,
      orm.id_rol,
      orm.nombre_rol,
      orm.acciones_inventario,
      orm.actualizado_en,
    );
  }

  async obtenerPorTelefono(telefono: string): Promise<SesionWhatsapp | null> {
    const orm = await this.repo.findOneBy({ telefono });
    return orm ? this.toEntity(orm) : null;
  }

  async upsert(
    telefono: string,
    data: Partial<Omit<SesionWhatsapp, 'telefono' | 'actualizado_en'>>,
  ): Promise<SesionWhatsapp> {
    const existing = await this.repo.findOneBy({ telefono });
    const merged = this.repo.merge(
      existing ?? this.repo.create({ telefono, paso: 'esperando_correo' }),
      data as any,
    );
    const saved = await this.repo.save(merged);
    return this.toEntity(saved);
  }

  async eliminar(telefono: string): Promise<void> {
    await this.repo.delete({ telefono });
  }
}
