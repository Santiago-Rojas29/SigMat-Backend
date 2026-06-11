import { RolPermisos } from '../entities/rol_permisos.entity';

export interface RolPermisosRepository {
  asignar(entity: RolPermisos): Promise<RolPermisos>;
  obtenerTodos(): Promise<RolPermisos[]>;
  obtenerPorRol(id_rol: string): Promise<RolPermisos[]>;
  obtenerPorId(id: string): Promise<RolPermisos | null>;
  actualizar(id: string, submodulos: string[], acciones: string[]): Promise<RolPermisos>;
  eliminar(id: string): Promise<void>;
}
