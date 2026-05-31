import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SedeOrmEntity } from '../../../sede/infrastructure/entities/sede.orm-entity';

export enum EstadoCentro {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity('centro')
export class CentroOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 100 })
  ciudad!: string;

  @Column({ length: 200 })
  direccion!: string;

  @Column({ length: 20 })
  telefono!: string;

  @Column({
    type: 'enum',
    enum: EstadoCentro,
    default: EstadoCentro.ACTIVO,
  })
  estado!: EstadoCentro;

  @OneToMany(() => SedeOrmEntity, (sede) => sede.centro)
  sedes!: SedeOrmEntity[];
}
