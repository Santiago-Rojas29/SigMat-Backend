import { Entrega } from '../entities/entrega.entity';

export interface EntregaRepository {
  crear(entrega: Entrega): Promise<Entrega>;
  obtenerTodos(): Promise<Entrega[]>;
  obtenerPorId(id: number): Promise<Entrega | null>;
  actualizar(id: number, data: Partial<Entrega>): Promise<Entrega>;
  eliminar(id: number): Promise<void>;
}
