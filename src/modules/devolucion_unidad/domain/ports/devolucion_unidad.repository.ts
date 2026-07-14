import { DevolucionUnidad } from '../entities/devolucion_unidad.entity';

export interface DevolucionUnidadRepository {
  crear(entity: DevolucionUnidad): Promise<DevolucionUnidad>;
  obtenerTodos(): Promise<DevolucionUnidad[]>;
  obtenerPorIds(id_devolucion: string, id_unidad: string): Promise<DevolucionUnidad | null>;
}
