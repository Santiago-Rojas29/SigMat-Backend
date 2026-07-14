import { Devolucion } from '../entities/devolucion.entity';

export interface DevolucionRepository {
  crear(entity: Devolucion): Promise<Devolucion>;
  obtenerTodos(): Promise<Devolucion[]>;
  obtenerPorId(id: string): Promise<Devolucion | null>;
  actualizar(id: string, data: Partial<Devolucion>): Promise<Devolucion>;
  eliminar(id: string): Promise<void>;
}
