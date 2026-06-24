import { Injectable, Inject, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
    contrasena: string;
    id_sede?: string | null;
  }): Promise<Usuario> {
    const existe = await this.repo.buscarPorCorreo(data.correo);
    if (existe) throw new ConflictException('El correo electrónico ya está registrado.');

    const hashContrasena = await bcrypt.hash(data.contrasena, 10);
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
      hashContrasena,
      data.id_sede ?? null,
    );
    entity.validar();
    return this.repo.crear(entity);
  }
}
