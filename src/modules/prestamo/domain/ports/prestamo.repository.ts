import { Prestamo } from '../entities/prestamo.entity';

export interface PrestamoRepository {
  create(entity: Prestamo): Promise<Prestamo>;
  findAll(): Promise<Prestamo[]>;
}
