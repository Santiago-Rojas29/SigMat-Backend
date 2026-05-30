import { SolicitudLote } from '../entities/solicitud_lote.entity';

export interface SolicitudLoteRepository {
  crear(solicitudLote: SolicitudLote): Promise<SolicitudLote>;
  obtenerTodos(): Promise<SolicitudLote[]>;
  obtenerPorId(id_solicitud: string, id_lote: string): Promise<SolicitudLote | null>;
  actualizar(id_solicitud: string, id_lote: string, data: Partial<SolicitudLote>): Promise<SolicitudLote>;
  eliminar(id_solicitud: string, id_lote: string): Promise<void>;
}
