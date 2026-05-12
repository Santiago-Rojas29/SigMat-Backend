import { Area } from '../entities/area.entity';

export interface AreaRepository {
  crear(area: Area): Promise<Area>;
  obtenerTodos(): Promise<Area[]>;
  obtenerPorId(id: number): Promise<Area | null>;
  actualizar(id: number, data: Partial<Area>): Promise<Area>;
  eliminar(id: number): Promise<void>;
}
