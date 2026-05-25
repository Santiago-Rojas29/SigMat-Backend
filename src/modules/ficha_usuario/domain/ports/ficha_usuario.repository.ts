import { FichaUsuario } from '../entities/ficha_usuario.entity';

export interface FichaUsuarioRepository {
  crear(fichaUsuario: FichaUsuario): Promise<FichaUsuario>;
  obtenerTodos(): Promise<FichaUsuario[]>;
  obtenerPorId(id_ficha: string, id_usuario: string): Promise<FichaUsuario | null>;
  actualizar(id_ficha: string, id_usuario: string, data: Partial<FichaUsuario>): Promise<FichaUsuario>;
  eliminar(id_ficha: string, id_usuario: string): Promise<void>;
}
