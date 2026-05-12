import { Lote } from '../entities/lote.entity';

export interface LoteRepository {
  crear(lote: Lote): Promise<Lote>;
  obtenerTodos(): Promise<Lote[]>;
  obtenerPorId(id: number): Promise<Lote | null>;
  actualizar(id: number, data: Partial<Lote>): Promise<Lote>;
  eliminar(id: number): Promise<void>;
}
