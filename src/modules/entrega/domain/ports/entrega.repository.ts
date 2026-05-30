import { Entrega } from '../entities/entrega.entity';

export interface EntregaRepository {
  crear(entrega: Entrega): Promise<Entrega>;
  obtenerTodos(): Promise<Entrega[]>;
  obtenerPorId(id: string): Promise<Entrega | null>;
  actualizar(id: string, data: Partial<Entrega>): Promise<Entrega>;
  eliminar(id: string): Promise<void>;
}
