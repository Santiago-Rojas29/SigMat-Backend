import { ProgramaOrmEntity } from 'src/modules/programa/infrastructure/entities/programa.orm-entity';
import { SedeOrmEntity } from 'src/modules/sede/infrastructure/entities/sede.orm-entity';
import { UbicacionOrmEntity } from 'src/modules/ubicacion/infrastructure/entities/ubicacion.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

export enum EstadoArea {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity('area')
export class AreaOrmEntity {
  @PrimaryGeneratedColumn()
  id_area!: string;

  @Column('uuid')
  id_sede!: string;

  @ManyToOne(() => SedeOrmEntity, (sede) => sede.area)
  @JoinColumn({ name: 'id_sede' })
  sede!: SedeOrmEntity;

  @Column()
  id_usuario!: string;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({
    type: 'enum',
    enum: EstadoArea,
    default: EstadoArea.ACTIVO,
  })
  estado!: EstadoArea;
  @OneToMany(() => ProgramaOrmEntity, (programa) => programa.id_area)
  programa!: ProgramaOrmEntity[];
  @OneToMany(() => UbicacionOrmEntity, (ubicacion) => ubicacion.id_area)
  ubicacion!: UbicacionOrmEntity[];
}
