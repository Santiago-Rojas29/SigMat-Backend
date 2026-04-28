import { Repository } from 'typeorm';
import { ValidacionRepository } from '../../../domain/ports/validacion.repository';
import { Validacion } from '../../../domain/entities/validacion.entity';
import { ValidacionOrmEntity } from '../../entities/validacion.orm-entity';

export class ValidacionTypeOrmRepository implements ValidacionRepository {
  constructor(private readonly repo: Repository<ValidacionOrmEntity>) {}

  async create(entity: Validacion): Promise<Validacion> {
    const orm = this.repo.create(entity);
    await this.repo.save(orm);
    return entity;
  }

  async findAll(): Promise<Validacion[]> {
    const data = await this.repo.find();
    return data;
  }
}
