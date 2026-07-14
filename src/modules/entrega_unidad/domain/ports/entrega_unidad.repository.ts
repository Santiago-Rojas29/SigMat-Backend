import { EntregaUnidad } from '../entities/entrega_unidad.entity';

export interface EntregaUnidadRepository {
  crear(entregaUnidad: EntregaUnidad): Promise<EntregaUnidad>;
  obtenerTodos(): Promise<EntregaUnidad[]>;
  obtenerPorIds(id_entrega: string, id_unidad: string): Promise<EntregaUnidad | null>;
  eliminar(id_entrega: string, id_unidad: string): Promise<void>;
}
