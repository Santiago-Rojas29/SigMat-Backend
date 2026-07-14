import { SesionWhatsapp } from '../entities/sesion-whatsapp.entity';

export interface SesionWhatsappRepository {
  obtenerPorTelefono(telefono: string): Promise<SesionWhatsapp | null>;
  upsert(
    telefono: string,
    data: Partial<Omit<SesionWhatsapp, 'telefono' | 'actualizado_en'>>,
  ): Promise<SesionWhatsapp>;
  eliminar(telefono: string): Promise<void>;
}
