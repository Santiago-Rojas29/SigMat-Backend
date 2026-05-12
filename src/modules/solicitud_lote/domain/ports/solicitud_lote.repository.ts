import { SolicitudLote } from '../entities/solicitud_lote.entity';

export interface SolicitudLoteRepository {
  crear(solicitudLote: SolicitudLote): Promise<SolicitudLote>;
  obtenerTodos(): Promise<SolicitudLote[]>;
  obtenerPorId(id_solicitud: number, id_lote: number): Promise<SolicitudLote | null>;
  actualizar(id_solicitud: number, id_lote: number, data: Partial<SolicitudLote>): Promise<SolicitudLote>;
  eliminar(id_solicitud: number, id_lote: number): Promise<void>;
}
