import { Injectable, Inject } from '@nestjs/common';
import type { EntregaUnidadRepository } from '../../domain/ports/entrega_unidad.repository';

@Injectable()
export class EliminarEntregaUnidadUseCase {
    constructor(
        @Inject('EntregaUnidadRepository')
        private readonly repo: EntregaUnidadRepository,
    ) {}

    async execute(id_entrega: string, id_unidad: string): Promise<void> {
        await this.repo.eliminar(id_entrega, id_unidad);
    }
}
