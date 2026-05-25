import { Lote } from '../entities/lote.entity';

export interface LoteRepository {
  crear(lote: Lote): Promise<Lote>;
  obtenerTodos(): Promise<Lote[]>;
  obtenerPorId(id: string): Promise<Lote | null>;
  actualizar(id: string, data: Partial<Lote>): Promise<Lote>;
  eliminar(id: string): Promise<void>;
}
