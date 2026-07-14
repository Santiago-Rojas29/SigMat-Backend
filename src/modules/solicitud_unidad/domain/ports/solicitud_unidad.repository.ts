import { SolicitudUnidad } from '../entities/solicitud_unidad.entity';

export interface SolicitudUnidadRepository {
  crear(solicitudUnidad: SolicitudUnidad): Promise<SolicitudUnidad>;
  obtenerTodos(): Promise<SolicitudUnidad[]>;
  obtenerPorId(id_solicitud: string, id_unidad: string): Promise<SolicitudUnidad | null>;
  actualizar(id_solicitud: string, id_unidad: string, data: Partial<SolicitudUnidad>): Promise<SolicitudUnidad>;
  eliminar(id_solicitud: string, id_unidad: string): Promise<void>;
}
