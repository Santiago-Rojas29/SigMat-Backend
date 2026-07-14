import { Injectable } from '@nestjs/common';
import { CreateUnidadUseCase } from './create-unidad.use-case';

@Injectable()
export class CrearMasivoUnidadUseCase {
  constructor(private readonly crearUseCase: CreateUnidadUseCase) {}

  async execute(
    unidades: Array<{
      id_material: string;
      id_responsable: string;
      id_ubicacion: string;
      codigo_unidad: string;
      estado: string;
      id_ficha?: string;
    }>,
  ): Promise<{ creadas: number; errores: string[] }> {
    const resultados = await Promise.allSettled(unidades.map(u => this.crearUseCase.execute(u)));
    const creadas = resultados.filter(r => r.status === 'fulfilled').length;
    const errores = resultados
      .map((r, i) =>
        r.status === 'rejected'
          ? `${unidades[i].codigo_unidad}: ${(r as PromiseRejectedResult).reason?.message ?? 'Error'}`
          : null,
      )
      .filter((e): e is string => e !== null);
    return { creadas, errores };
  }
}
