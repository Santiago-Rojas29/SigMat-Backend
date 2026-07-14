import { SolicitudAprendiz } from '../entities/solicitud_aprendiz.entity';

export interface SolicitudAprendizRepository {
  crear(sa: SolicitudAprendiz): Promise<SolicitudAprendiz>;
  obtenerTodos(): Promise<SolicitudAprendiz[]>;
  obtenerPorId(id_solicitud: string, id_aprendiz: string): Promise<SolicitudAprendiz | null>;
  eliminar(id_solicitud: string, id_aprendiz: string): Promise<void>;
}
