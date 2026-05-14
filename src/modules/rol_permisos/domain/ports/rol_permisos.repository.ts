import { RolPermisos } from '../entities/rol_permisos.entity';

export interface RolPermisosRepository {
  crear(entity: RolPermisos): Promise<RolPermisos>;
  obtenerTodos(): Promise<RolPermisos[]>;
  obtenerPorIds(id_rol: string, id_permiso: string): Promise<RolPermisos | null>;
}
