import { Ficha } from '../entities/ficha.entity';

export interface FichaRepository {
  crear(ficha: Ficha): Promise<Ficha>;
  obtenerTodos(): Promise<Ficha[]>;
  obtenerPorId(id: number): Promise<Ficha | null>;
  actualizar(id: number, data: Partial<Ficha>): Promise<Ficha>;
  eliminar(id: number): Promise<void>;
}
