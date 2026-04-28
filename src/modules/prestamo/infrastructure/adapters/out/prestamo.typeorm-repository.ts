import { Repository } from 'typeorm';
import { PrestamoRepository } from '../../../domain/ports/prestamo.repository';
import { Prestamo } from '../../../domain/entities/prestamo.entity';
import { PrestamoOrmEntity } from '../../entities/prestamo.orm-entity';

export class PrestamoTypeOrmRepository implements PrestamoRepository {
  constructor(private readonly repo: Repository<PrestamoOrmEntity>) {}

  async create(entity: Prestamo): Promise<Prestamo> {
    const orm = this.repo.create(entity);
    await this.repo.save(orm);
    return entity;
  }

  async findAll(): Promise<Prestamo[]> {
    const data = await this.repo.find();
    return data;
  }
}
