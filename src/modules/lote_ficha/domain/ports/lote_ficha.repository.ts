import { LoteFicha } from '../entities/lote_ficha.entity';

export interface LoteFichaRepository {
  crear(entity: LoteFicha): Promise<LoteFicha>;
  obtenerTodos(): Promise<LoteFicha[]>;
  obtenerPorLote(id_lote: string): Promise<LoteFicha[]>;
  obtenerPorId(id: string): Promise<LoteFicha | null>;
  actualizar(id: string, cantidad: number): Promise<LoteFicha>;
  eliminar(id: string): Promise<void>;
}
