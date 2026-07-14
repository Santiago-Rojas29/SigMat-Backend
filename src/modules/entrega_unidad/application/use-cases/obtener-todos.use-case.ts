import { Injectable, Inject } from '@nestjs/common';
import { EntregaUnidad } from '../../domain/entities/entrega_unidad.entity';
import type { EntregaUnidadRepository } from '../../domain/ports/entrega_unidad.repository';

@Injectable()
export class ObtenerTodosEntregaUnidadUseCase {
    constructor(
        @Inject('EntregaUnidadRepository')
        private readonly repo: EntregaUnidadRepository,
    ) {}

    async execute(): Promise<EntregaUnidad[]> {
        return this.repo.obtenerTodos();
    }
}
