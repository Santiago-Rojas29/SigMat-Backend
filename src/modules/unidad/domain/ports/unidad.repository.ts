import { Unidad } from '../entities/unidad.entity';

export interface UnidadRepository {
  crear(unidad: Unidad): Promise<Unidad>;
  obtenerTodos(): Promise<Unidad[]>;
  obtenerPorId(id: string): Promise<Unidad | null>;
  obtenerPorUbicacion(id_ubicacion: string): Promise<Unidad[]>;
  actualizar(id: string, data: Partial<Unidad>): Promise<Unidad>;
  eliminar(id: string): Promise<void>;
}
