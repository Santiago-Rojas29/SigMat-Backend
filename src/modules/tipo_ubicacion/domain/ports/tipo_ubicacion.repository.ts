import { TipoUbicacion } from '../entities/tipo_ubicacion.entity';

export interface TipoUbicacionRepository {
  crear(tipoUbicacion: TipoUbicacion): Promise<TipoUbicacion>;
  obtenerTodos(): Promise<TipoUbicacion[]>;
  obtenerPorId(id: number): Promise<TipoUbicacion | null>;
  actualizar(id: number, data: Partial<TipoUbicacion>): Promise<TipoUbicacion>;
  eliminar(id: number): Promise<void>;
}
