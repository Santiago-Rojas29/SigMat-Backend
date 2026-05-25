import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CentroOrmEntity } from '../../../centro/infrastructure/entities/centro.orm-entity';
import { AreaOrmEntity } from 'src/modules/area/infrastructure/entities/area.orm-entity';

export enum EstadoSede {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity('sede')
export class SedeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id_sede!: string;

  @Column('uuid')
  id_centro!: string;

  @ManyToOne(() => CentroOrmEntity, (centro) => centro.sedes)
  @JoinColumn({ name: 'id_centro' })
  centro!: CentroOrmEntity;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 200 })
  direccion!: string;

  @Column({ length: 20 })
  telefono!: string;

  @Column({
    type: 'enum',
    enum: EstadoSede,
    default: EstadoSede.ACTIVO,
  })
  estado!: EstadoSede;
  @OneToMany(() => AreaOrmEntity, (area) => area.sede)
  area!: AreaOrmEntity[];
}
