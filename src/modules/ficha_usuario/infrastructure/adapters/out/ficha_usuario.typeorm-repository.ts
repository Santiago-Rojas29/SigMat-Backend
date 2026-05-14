import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichaUsuarioRepository } from '../../../domain/ports/ficha_usuario.repository';
import { FichaUsuario } from '../../../domain/entities/ficha_usuario.entity';
import { FichaUsuarioOrmEntity } from '../../entities/ficha_usuario.orm-entity';

@Injectable()
export class FichaUsuarioTypeOrmRepository implements FichaUsuarioRepository {
  constructor(
    @InjectRepository(FichaUsuarioOrmEntity)
    private readonly repo: Repository<FichaUsuarioOrmEntity>,
  ) { }

  private toEntity(orm: FichaUsuarioOrmEntity): FichaUsuario {
    return new FichaUsuario(
      orm.id_ficha,
      orm.id_usuario,
      orm.rol_en_ficha,
    );
  }

  async crear(fichaUsuario: FichaUsuario): Promise<FichaUsuario> {
    const orm = this.repo.create({
      id_ficha: fichaUsuario.id_ficha,
      id_usuario: fichaUsuario.id_usuario,
      rol_en_ficha: fichaUsuario.rol_en_ficha as any,
    });
    const saved = await this.repo.save(orm);
    return this.toEntity(saved);
  }

  async obtenerTodos(): Promise<FichaUsuario[]> {
    const data = await this.repo.find();
    return data.map((orm) => this.toEntity(orm));
  }

  async obtenerPorId(id_ficha: string, id_usuario: string): Promise<FichaUsuario | null> {
    const orm = await this.repo.findOneBy({ id_ficha, id_usuario });
    return orm ? this.toEntity(orm) : null;
  }

  async actualizar(id_ficha: string, id_usuario: string, data: Partial<FichaUsuario>): Promise<FichaUsuario> {
    await this.repo.update({ id_ficha, id_usuario }, data as any);
    const orm = await this.repo.findOneBy({ id_ficha, id_usuario });
    if (!orm) throw new Error(`FichaUsuario con id_ficha ${id_ficha} e id_usuario ${id_usuario} no encontrado`);
    return this.toEntity(orm);
  }

  async eliminar(id_ficha: string, id_usuario: string): Promise<void> {
    await this.repo.delete({ id_ficha, id_usuario });
  }
}
