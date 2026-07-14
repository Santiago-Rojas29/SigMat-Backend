import { TipoUbicacion } from '../entities/tipo_ubicacion.entity';

export interface TipoUbicacionRepository {
  crear(tipoUbicacion: TipoUbicacion): Promise<TipoUbicacion>;
  obtenerTodos(): Promise<TipoUbicacion[]>;
  obtenerPorId(id: string): Promise<TipoUbicacion | null>;
  actualizar(id: string, data: Partial<TipoUbicacion>): Promise<TipoUbicacion>;
  eliminar(id: string): Promise<void>;
}
