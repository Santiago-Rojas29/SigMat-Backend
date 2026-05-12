import { Unidad } from '../entities/unidad.entity';

export interface UnidadRepository {
  crear(unidad: Unidad): Promise<Unidad>;
  obtenerTodos(): Promise<Unidad[]>;
  obtenerPorId(id: number): Promise<Unidad | null>;
  actualizar(id: number, data: Partial<Unidad>): Promise<Unidad>;
  eliminar(id: number): Promise<void>;
}
