import { Kardex } from '../entities/kardex.entity';

export interface KardexRepository {
  crear(entity: Kardex): Promise<Kardex>;
  obtenerTodos(): Promise<Kardex[]>;
  obtenerPorId(id: string): Promise<Kardex | null>;
  actualizar(id: string, data: Partial<Kardex>): Promise<Kardex>;
  eliminar(id: string): Promise<void>;
}
