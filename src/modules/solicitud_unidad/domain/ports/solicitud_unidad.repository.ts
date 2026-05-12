import { SolicitudUnidad } from '../entities/solicitud_unidad.entity';

export interface SolicitudUnidadRepository {
  crear(solicitudUnidad: SolicitudUnidad): Promise<SolicitudUnidad>;
  obtenerTodos(): Promise<SolicitudUnidad[]>;
  obtenerPorId(id_solicitud: number, id_unidad: number): Promise<SolicitudUnidad | null>;
  actualizar(id_solicitud: number, id_unidad: number, data: Partial<SolicitudUnidad>): Promise<SolicitudUnidad>;
  eliminar(id_solicitud: number, id_unidad: number): Promise<void>;
}
