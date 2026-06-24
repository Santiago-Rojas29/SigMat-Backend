import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../../domain/entities/usuario.entity';
import { UsuarioRepository } from '../../../domain/ports/usuario.repository';
import { UsuarioOrmEntity } from '../../entities/usuario.orm-entity';
import { TenantService } from 'src/common/tenant/tenant.service';

@Injectable()
export class UsuarioTypeOrmRepository implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repo: Repository<UsuarioOrmEntity>,
    private readonly tenant: TenantService,
  ) {}

  private toEntity(orm: UsuarioOrmEntity): Usuario {
    return new Usuario(
      orm.id,
      orm.id_rol,
      orm.tipo_documento,
      orm.numero_documento,
      orm.nombres,
      orm.apellidos,
      orm.correo,
      orm.telefono,
      orm.estado,
      '',
      orm.id_sede ?? null,
    );
  }

  async crear(entity: Usuario): Promise<Usuario> {
    const orm = this.repo.create({
      id_rol: entity.id_rol,
      tipo_documento: entity.tipo_documento,
      numero_documento: entity.numero_documento,
      nombres: entity.nombres,
      apellidos: entity.apellidos,
      correo: entity.correo,
      telefono: entity.telefono,
      estado: entity.estado,
      contrasena: entity.contrasena,
      id_sede: entity.id_sede,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Usuario[]> {
    const where = this.tenant.isRoot ? {} : { id_sede: this.tenant.tenantId! };
    const data = await this.repo.find({ where });
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Usuario | null> {
    const orm = await this.repo.findOneBy({ id });
    if (!orm) return null;
    return this.toEntity(orm);
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    const orm = await this.repo.findOneBy({ correo });
    if (!orm) return null;
    return this.toEntity(orm);
  }

  async actualizar(id: string, data: Partial<Usuario>): Promise<Usuario> {
    await this.repo.update(id, data as any);
    const orm = await this.repo.findOneBy({ id });
    if (!orm) throw new Error(`Usuario con id ${id} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
