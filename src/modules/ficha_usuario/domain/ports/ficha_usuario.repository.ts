import { FichaUsuario } from '../entities/ficha_usuario.entity';

export interface FichaUsuarioRepository {
  crear(fichaUsuario: FichaUsuario): Promise<FichaUsuario>;
  obtenerTodos(): Promise<FichaUsuario[]>;
  obtenerPorId(id_ficha: number, id_usuario: number): Promise<FichaUsuario | null>;
  actualizar(id_ficha: number, id_usuario: number, data: Partial<FichaUsuario>): Promise<FichaUsuario>;
  eliminar(id_ficha: number, id_usuario: number): Promise<void>;
}
