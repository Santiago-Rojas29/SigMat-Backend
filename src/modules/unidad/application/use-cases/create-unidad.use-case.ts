import { Injectable, Inject } from '@nestjs/common';
import type { UnidadRepository } from '../../domain/ports/unidad.repository';
import { Unidad } from '../../domain/entities/unidad.entity';
import { KardexAutoService } from '../../../kardex/application/services/kardex-auto.service';

@Injectable()
export class CreateUnidadUseCase {
  constructor(
    @Inject('UnidadRepository')
    private readonly repo: UnidadRepository,
    private readonly kardexAuto: KardexAutoService,
  ) {}

  async execute(data: {
    id_material: string;
    id_responsable: string;
    id_ubicacion: string;
    codigo_unidad: string;
    estado: string;
    id_ficha?: string;
  }): Promise<Unidad> {
    const entity = new Unidad(
      '',
      data.id_material,
      data.id_responsable,
      data.id_ubicacion,
      data.codigo_unidad,
      data.estado,
      data.id_ficha,
    );
    const unidad = await this.repo.crear(entity);
    await this.kardexAuto.entradaUnidad(unidad.id_unidad);
    return unidad;
  }
}
