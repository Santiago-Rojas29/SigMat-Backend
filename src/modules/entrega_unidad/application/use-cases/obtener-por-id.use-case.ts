import { Injectable, Inject } from '@nestjs/common';
import { EntregaUnidad } from '../../domain/entities/entrega_unidad.entity';
import type { EntregaUnidadRepository } from '../../domain/ports/entrega_unidad.repository';

@Injectable()
export class ObtenerEntregaUnidadPorIdsUseCase {
    constructor(
        @Inject('EntregaUnidadRepository')
        private readonly repo: EntregaUnidadRepository,
    ) {}

    async execute(id_entrega: string, id_unidad: string): Promise<EntregaUnidad | null> {
        return this.repo.obtenerPorIds(id_entrega, id_unidad);
    }
}
