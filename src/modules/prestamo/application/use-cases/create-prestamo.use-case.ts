import { Injectable, Inject } from '@nestjs/common';
import type { PrestamoRepository } from '../../domain/ports/prestamo.repository';
import { Prestamo } from '../../domain/entities/prestamo.entity';

@Injectable()
export class CreatePrestamoUseCase {
  constructor(
    @Inject('PrestamoRepository')
    private readonly repo: PrestamoRepository,
  ) {}

  async execute(data: { id_validacion: string; fecha_limite: string; estado: string }): Promise<Prestamo> {
    const entity = new Prestamo('', data.id_validacion, new Date(data.fecha_limite), data.estado);
    return this.repo.crear(entity);
  }
}
