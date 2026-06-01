import { UsuarioPermisos } from '../entities/usuario_permisos.entity';

export interface UsuarioPermisosRepository {
  asignar(entity: UsuarioPermisos): Promise<UsuarioPermisos>;
  obtenerPorUsuario(id_usuario: string): Promise<UsuarioPermisos[]>;
  obtenerPorId(id: string): Promise<UsuarioPermisos | null>;
  actualizarSubmodulos(id: string, submodulos: string[]): Promise<UsuarioPermisos>;
  revocar(id: string): Promise<void>;
  revocarTodosPorUsuario(id_usuario: string): Promise<void>;
}
