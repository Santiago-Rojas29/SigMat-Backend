import { Area } from '../entities/area.entity';

export interface AreaRepository {
  crear(area: Area): Promise<Area>;
  obtenerTodos(): Promise<Area[]>;
  obtenerPorId(id: string): Promise<Area | null>;
  actualizar(id: string, data: Partial<Area>): Promise<Area>;
  eliminar(id: string): Promise<void>;
}