import { EntregaLote } from '../entities/entrega_lote.entity';

export interface EntregaLoteRepository {
  crear(entregaLote: EntregaLote): Promise<EntregaLote>;
  obtenerTodos(): Promise<EntregaLote[]>;
  obtenerPorIds(id_entrega: string, id_lote: string): Promise<EntregaLote | null>;
  actualizar(id_entrega: string, id_lote: string, data: Partial<EntregaLote>): Promise<EntregaLote>;
  eliminar(id_entrega: string, id_lote: string): Promise<void>;
}
