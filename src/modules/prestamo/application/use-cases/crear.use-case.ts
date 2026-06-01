import { Injectable, Inject } from '@nestjs/common';
import { Prestamo, EstadoPrestamo } from '../../domain/entities/prestamo.entity';
import type { PrestamoRepository } from '../../domain/ports/prestamo.repository';

@Injectable()
export class CreatePrestamoUseCase {
  constructor(
    @Inject('PrestamoRepository')
    private readonly repo: PrestamoRepository,
  ) {}

  async execute(data: { id_usuario: string; id_validacion: string; fecha_limite: string; estado: string }): Promise<Prestamo> {
    const entity = new Prestamo('', data.id_usuario, data.id_validacion, new Date(data.fecha_limite), data.estado as EstadoPrestamo);
    entity.validar();
    return this.repo.crear(entity);
  }
}
