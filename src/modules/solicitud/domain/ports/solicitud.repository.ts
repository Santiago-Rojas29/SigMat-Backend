import { Solicitud } from '../entities/solicitud.entity';

export interface SolicitudRepository {
  crear(solicitud: Solicitud): Promise<Solicitud>;
  obtenerTodos(): Promise<Solicitud[]>;
  obtenerPorId(id: number): Promise<Solicitud | null>;
  actualizar(id: number, data: Partial<Solicitud>): Promise<Solicitud>;
  eliminar(id: number): Promise<void>;
}
