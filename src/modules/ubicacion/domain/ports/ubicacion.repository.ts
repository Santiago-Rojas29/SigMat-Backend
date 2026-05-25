import { Ubicacion } from '../entities/ubicacion.entity';

export interface UbicacionRepository {
  crear(ubicacion: Ubicacion): Promise<Ubicacion>;
  obtenerTodos(): Promise<Ubicacion[]>;
  obtenerPorId(id: string): Promise<Ubicacion | null>;
  actualizar(id: string, data: Partial<Ubicacion>): Promise<Ubicacion>;
  eliminar(id: string): Promise<void>;
}
