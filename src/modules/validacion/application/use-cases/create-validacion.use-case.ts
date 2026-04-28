import { ValidacionRepository } from '../../domain/ports/validacion.repository';
import { Validacion } from '../../domain/entities/validacion.entity';

export class CreateValidacionUseCase {
  constructor(private readonly repo: ValidacionRepository) {}

  async execute(data: { id: string; name: string }): Promise<Validacion> {
    const entity = new Validacion(data.id, data.name);
    return this.repo.create(entity);
  }
}
