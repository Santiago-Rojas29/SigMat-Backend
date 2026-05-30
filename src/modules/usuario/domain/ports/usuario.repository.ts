import { Usuario } from '../entities/usuario.entity';

export interface UsuarioRepository {
  crear(entity: Usuario): Promise<Usuario>;
  obtenerTodos(): Promise<Usuario[]>;
  obtenerPorId(id: string): Promise<Usuario | null>;
  actualizar(id: string, data: Partial<Usuario>): Promise<Usuario>;
  eliminar(id: string): Promise<void>;
}
