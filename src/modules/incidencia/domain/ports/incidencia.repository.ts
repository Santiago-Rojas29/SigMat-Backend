import { Incidencia } from '../entities/incidencia.entity';

export interface IncidenciaRepository {
  crear(entity: Incidencia): Promise<Incidencia>;
  obtenerTodos(): Promise<Incidencia[]>;
  obtenerPorId(id: string): Promise<Incidencia | null>;
  actualizar(id: string, data: Partial<Incidencia>): Promise<Incidencia>;
  eliminar(id: string): Promise<void>;
}
