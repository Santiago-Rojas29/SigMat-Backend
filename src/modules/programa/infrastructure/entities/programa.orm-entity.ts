import { AreaOrmEntity } from 'src/modules/area/infrastructure/entities/area.orm-entity';
import { FichaOrmEntity } from 'src/modules/ficha/infrastructure/entities/ficha.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

export enum NivelFormacion {
  TECNICO = 'tecnico',
  TECNOLOGO = 'tecnologo',
  COMPLEMENTARIA = 'complementaria',
}

export enum EstadoPrograma {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity('programa')
export class ProgramaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id_programa!: string;

  @Column('uuid')
  id_area!: string;

  @ManyToOne(() => AreaOrmEntity, (area) => area.programa)
  @JoinColumn({ name: 'id_area' })
  area!: AreaOrmEntity;

  @Column({ length: 150 })
  nombre!: string;

  @Column({ length: 50 })
  codigo_programa!: string;

  @Column({
    type: 'enum',
    enum: NivelFormacion,
  })
  nivel_formacion!: NivelFormacion;

  @Column({
    type: 'enum',
    enum: EstadoPrograma,
    default: EstadoPrograma.ACTIVO,
  })
  estado!: EstadoPrograma;
  @OneToMany(() => FichaOrmEntity, (ficha) => ficha.programa)
  ficha!: FichaOrmEntity[];
}
