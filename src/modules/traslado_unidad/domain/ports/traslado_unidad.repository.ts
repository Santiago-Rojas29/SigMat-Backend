import { TrasladoUnidad } from '../entities/traslado_unidad.entity';

export interface TrasladoUnidadRepository {
  crear(entity: TrasladoUnidad): Promise<TrasladoUnidad>;
  obtenerTodos(): Promise<TrasladoUnidad[]>;
  obtenerPorIds(id_traslado: string, id_unidad: string): Promise<TrasladoUnidad | null>;
}
