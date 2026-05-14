import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ModuloPermiso } from '../../domain/entities/permisos.entity';

@Entity('permisos')
export class PermisosOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  nombre!: string;

  @Column('text')
  descripcion!: string;

  @Column({ type: 'enum', enum: ModuloPermiso })
  modulo!: ModuloPermiso;
}
