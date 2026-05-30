import { Inject, Injectable } from '@nestjs/common';
import { Kardex } from '../../domain/entities/kardex.entity';
import type { KardexRepository } from '../../domain/ports/kardex.repository';

@Injectable()
export class ObtenerTodosKardexUseCase {
  constructor(
    @Inject('KardexRepository')
    private readonly repo: KardexRepository,
  ) {}

  async execute(): Promise<Kardex[]> {
    return this.repo.obtenerTodos();
  }
}
