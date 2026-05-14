import { Injectable, Inject } from '@nestjs/common';
import { Usuario, TipoDocumento, EstadoUsuario } from '../../domain/entities/usuario.entity';
import type { UsuarioRepository } from '../../domain/ports/usuario.repository';

@Injectable()
export class CrearUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly repo: UsuarioRepository,
  ) {}

  async execute(data: {
    id_rol: string;
    tipo_documento: TipoDocumento;
    numero_documento: string;
    nombres: string;
    apellidos: string;
    correo: string;
    telefono: string;
    estado: EstadoUsuario;
  }): Promise<Usuario> {
    const entity = new Usuario(
      '',
      data.id_rol,
      data.tipo_documento,
      data.numero_documento,
      data.nombres,
      data.apellidos,
      data.correo,
      data.telefono,
      data.estado,
    );
    entity.validar();
    return this.repo.crear(entity);
  }
}
