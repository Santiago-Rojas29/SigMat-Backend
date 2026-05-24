import { Injectable, Inject } from '@nestjs/common';
import { Usuario, TipoDocumento, EstadoUsuario } from '../../domain/entities/usuario.entity';
import type { UsuarioRepository } from '../../domain/ports/usuario.repository';

@Injectable()
export class ActualizarUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly repo: UsuarioRepository,
  ) {}

  async execute(
    id: string,
    data: {
      id_rol?: string;
      tipo_documento?: TipoDocumento;
      numero_documento?: string;
      nombres?: string;
      apellidos?: string;
      correo?: string;
      telefono?: string;
      estado?: EstadoUsuario;
    },
  ): Promise<Usuario> {
    const mapped: Partial<Usuario> = {
      ...(data.id_rol && { id_rol: data.id_rol }),
      ...(data.tipo_documento && { tipo_documento: data.tipo_documento }),
      ...(data.numero_documento && { numero_documento: data.numero_documento }),
      ...(data.nombres && { nombres: data.nombres }),
      ...(data.apellidos && { apellidos: data.apellidos }),
      ...(data.correo && { correo: data.correo }),
      ...(data.telefono && { telefono: data.telefono }),
      ...(data.estado && { estado: data.estado }),
    };
    return this.repo.actualizar(id, mapped);
  }
}
