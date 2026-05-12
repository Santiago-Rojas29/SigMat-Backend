import { Programa } from '../entities/programa.entity';

export interface ProgramaRepository {
  crear(programa: Programa): Promise<Programa>;
  obtenerTodos(): Promise<Programa[]>;
  obtenerPorId(id: number): Promise<Programa | null>;
  actualizar(id: number, data: Partial<Programa>): Promise<Programa>;
  eliminar(id: number): Promise<void>;
}
