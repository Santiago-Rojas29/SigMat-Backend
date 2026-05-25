import { Injectable, Inject } from '@nestjs/common';
import { Ficha } from '../../domain/entities/ficha.entity';
import type { FichaRepository } from '../../domain/ports/ficha.repository';

@Injectable()
export class ActualizarFichaUseCase {
  constructor(
    @Inject('FichaRepository')
    private readonly repo: FichaRepository,
  ) { }

  async execute(
    id: string,
    data: {
      id_programa?: string;
      codigo_ficha?: string;
      fecha_inicio?: string;
      fecha_fin?: string;
      jornada?: string;
      estado?: string;
    },
  ): Promise<Ficha> {
    const mapped: Partial<Ficha> = {
      ...(data.id_programa !== undefined && { id_programa: data.id_programa }),
      ...(data.codigo_ficha !== undefined && { codigo_ficha: data.codigo_ficha }),
      ...(data.fecha_inicio !== undefined && { fecha_inicio: new Date(data.fecha_inicio) }),
      ...(data.fecha_fin !== undefined && { fecha_fin: new Date(data.fecha_fin) }),
      ...(data.jornada !== undefined && { jornada: data.jornada }),
      ...(data.estado !== undefined && { estado: data.estado }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
