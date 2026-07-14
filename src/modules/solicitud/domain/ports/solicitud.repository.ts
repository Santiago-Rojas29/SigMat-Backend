import { Solicitud } from '../entities/solicitud.entity';

export interface SolicitudRepository {
  crear(solicitud: Solicitud): Promise<Solicitud>;
  obtenerTodos(): Promise<Solicitud[]>;
  obtenerPorId(id: string): Promise<Solicitud | null>;
  actualizar(id: string, data: Partial<Solicitud>): Promise<Solicitud>;
  eliminar(id: string): Promise<void>;
}
