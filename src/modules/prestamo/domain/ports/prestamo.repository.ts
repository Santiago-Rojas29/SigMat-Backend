import { Prestamo } from '../entities/prestamo.entity';

export interface PrestamoRepository {
  crear(prestamo: Prestamo): Promise<Prestamo>;
  obtenerTodos(): Promise<Prestamo[]>;
  obtenerPorId(id: string): Promise<Prestamo | null>;
  actualizar(id: string, data: Partial<Prestamo>): Promise<Prestamo>;
  eliminar(id: string): Promise<void>;
}
