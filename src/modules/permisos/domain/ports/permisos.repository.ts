import { Permisos } from '../entities/permisos.entity';

export interface PermisosRepository {
  crear(entity: Permisos): Promise<Permisos>;
  obtenerTodos(): Promise<Permisos[]>;
  obtenerPorId(id: string): Promise<Permisos | null>;
  actualizar(id: string, data: Partial<Permisos>): Promise<Permisos>;
  eliminar(id: string): Promise<void>;
}
