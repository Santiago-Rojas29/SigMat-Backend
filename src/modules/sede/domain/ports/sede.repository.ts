import { Sede } from '../entities/sede.entity';

export interface SedeRepository {
  crear(sede: Sede): Promise<Sede>;
  obtenerTodos(): Promise<Sede[]>;
  obtenerPorId(id: number): Promise<Sede | null>;
  actualizar(id: number, data: Partial<Sede>): Promise<Sede>;
  eliminar(id: number): Promise<void>;
}
