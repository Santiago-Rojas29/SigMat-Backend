import { Material } from '../entities/material.entity';

export interface MaterialRepository {
  crear(entity: Material): Promise<Material>;
  obtenerTodos(): Promise<Material[]>;
  obtenerPorId(id: string): Promise<Material | null>;
  actualizar(id: string, data: Partial<Material>): Promise<Material>;
  eliminar(id: string): Promise<void>;
}
