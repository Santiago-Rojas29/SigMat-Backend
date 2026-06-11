import { Injectable } from '@nestjs/common';
import { CrearMaterialUseCase } from './crear.use-case';
import { CrearMaterialDto } from '../../infrastructure/adapters/in/dto/crear.dto';

@Injectable()
export class ImportarMaterialesUseCase {
  constructor(private readonly crearUseCase: CrearMaterialUseCase) {}

  async execute(items: CrearMaterialDto[]): Promise<{
    exitosos: number;
    errores: { fila: number; error: string }[];
  }> {
    let exitosos = 0;
    const errores: { fila: number; error: string }[] = [];
    for (let i = 0; i < items.length; i++) {
      try {
        await this.crearUseCase.execute(items[i]);
        exitosos++;
      } catch (e: any) {
        errores.push({ fila: i + 2, error: e?.message ?? 'Error desconocido' });
      }
    }
    return { exitosos, errores };
  }
}
