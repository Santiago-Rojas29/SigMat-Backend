import { TrasladoLote } from '../entities/traslado_lote.entity';

export interface TrasladoLoteRepository {
  crear(entity: TrasladoLote): Promise<TrasladoLote>;
  obtenerTodos(): Promise<TrasladoLote[]>;
  obtenerPorIds(id_traslado: string, id_lote: string): Promise<TrasladoLote | null>;
}
