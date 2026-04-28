import { PrestamoRepository } from '../../domain/ports/prestamo.repository';
import { Prestamo } from '../../domain/entities/prestamo.entity';

export class CreatePrestamoUseCase {
  constructor(private readonly repo: PrestamoRepository) {}

  async execute(data: { id: string; name: string }): Promise<Prestamo> {
    const entity = new Prestamo(data.id, data.name);
    return this.repo.create(entity);
  }
}
