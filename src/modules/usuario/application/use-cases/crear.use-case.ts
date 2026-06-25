import { Injectable, Inject, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario, TipoDocumento, EstadoUsuario } from '../../domain/entities/usuario.entity';
import type { UsuarioRepository } from '../../domain/ports/usuario.repository';
import { TenantService } from 'src/common/tenant/tenant.service';

@Injectable()
export class CrearUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly repo: UsuarioRepository,
    @InjectDataSource() private readonly db: DataSource,
    private readonly tenant: TenantService,
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
    if (!this.tenant.isRoot) {
      const [rol] = await this.db.query(`SELECT nombre FROM rol WHERE id = $1 LIMIT 1`, [data.id_rol]);
      if (rol?.nombre === 'Root') throw new ForbiddenException('No tienes permisos para asignar el rol Root.');
    }

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
