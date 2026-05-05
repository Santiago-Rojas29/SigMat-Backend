import { Centro } from '../entities/centro.entity';

export interface CentroRepository {
  crear(entity: Centro): Promise<Centro>;
  obtenerTodos(): Promise<Centro[]>;
  obtenerPorId(id: string): Promise<Centro | null>;
  actualizar(id: string, data: Partial<Centro>): Promise<Centro>;
  eliminar(id: string): Promise<void>;
}
