import { Traslado } from '../entities/traslado.entity';

export interface TrasladoRepository {
  crear(entity: Traslado): Promise<Traslado>;
  obtenerTodos(): Promise<Traslado[]>;
  obtenerPorId(id: string): Promise<Traslado | null>;
  actualizar(id: string, data: Partial<Traslado>): Promise<Traslado>;
  eliminar(id: string): Promise<void>;
}
