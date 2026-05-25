import { Sede } from '../entities/sede.entity';

export interface SedeRepository {
  crear(sede: Sede): Promise<Sede>;
  obtenerTodos(): Promise<Sede[]>;
  obtenerPorId(id: string): Promise<Sede | null>;
  actualizar(id: string, data: Partial<Sede>): Promise<Sede>;
  eliminar(id: string): Promise<void>;
}
