import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../../domain/entities/usuario.entity';
import { UsuarioRepository } from '../../../domain/ports/usuario.repository';
import { UsuarioOrmEntity } from '../../entities/usuario.orm-entity';

@Injectable()
export class UsuarioTypeOrmRepository implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repo: Repository<UsuarioOrmEntity>,
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
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<Usuario[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id: string): Promise<Usuario | null> {
    const orm = await this.repo.findOneBy({ id });
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
