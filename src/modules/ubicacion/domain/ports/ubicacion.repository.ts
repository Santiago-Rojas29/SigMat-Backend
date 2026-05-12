import { Ubicacion } from '../entities/ubicacion.entity';

export interface UbicacionRepository {
  crear(ubicacion: Ubicacion): Promise<Ubicacion>;
  obtenerTodos(): Promise<Ubicacion[]>;
  obtenerPorId(id: number): Promise<Ubicacion | null>;
  actualizar(id: number, data: Partial<Ubicacion>): Promise<Ubicacion>;
  eliminar(id: number): Promise<void>;
}
