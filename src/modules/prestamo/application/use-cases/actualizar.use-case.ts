import { Injectable, Inject } from '@nestjs/common';
import { EstadoPrestamo, Prestamo } from '../../domain/entities/prestamo.entity';
import type { PrestamoRepository } from '../../domain/ports/prestamo.repository';

@Injectable()
export class ActualizarPrestamoUseCase {
  constructor(
    @Inject('PrestamoRepository')
    private readonly repo: PrestamoRepository,
  ) {}

   async execute(
     id: string,
     data: { id_validacion?: string; fecha_limite?: string; estado?: EstadoPrestamo },
   ): Promise<Prestamo> {
     const mapped: Partial<Prestamo> = {
       ...(data.id_validacion && { id_validacion: data.id_validacion }),
       ...(data.fecha_limite && { fecha_limite: new Date(data.fecha_limite) }),
       ...(data.estado && { estado: data.estado }),
     };
     return this.repo.actualizar(id, mapped);
   }
}
