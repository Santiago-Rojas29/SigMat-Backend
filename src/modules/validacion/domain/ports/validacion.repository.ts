import { Validacion } from '../entities/validacion.entity';

export interface ValidacionRepository {
  crear(validacion: Validacion): Promise<Validacion>;
  obtenerTodos(): Promise<Validacion[]>;
  obtenerPorId(id: string): Promise<Validacion | null>;
  actualizar(id: string, data: Partial<Validacion>): Promise<Validacion>;
  eliminar(id: string): Promise<void>;
}
