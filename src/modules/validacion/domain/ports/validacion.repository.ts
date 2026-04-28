import { Validacion } from '../entities/validacion.entity';

export interface ValidacionRepository {
  create(entity: Validacion): Promise<Validacion>;
  findAll(): Promise<Validacion[]>;
}
