import { ProgramaOrmEntity } from 'src/modules/programa/infrastructure/entities/programa.orm-entity';
import { SedeOrmEntity } from 'src/modules/sede/infrastructure/entities/sede.orm-entity';
import { UbicacionOrmEntity } from 'src/modules/ubicacion/infrastructure/entities/ubicacion.orm-entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

export enum EstadoArea {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity('area')
export class AreaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id_area!: string;

  @Column('uuid')
  id_sede!: string;

  @ManyToOne(() => SedeOrmEntity, (sede) => sede.area)
  @JoinColumn({ name: 'id_sede' })
  sede!: SedeOrmEntity;

  @Column('uuid')
  id_usuario!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.area)
  @JoinColumn({ name: 'id_usuario'})
  usuario!: UsuarioOrmEntity;

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
  @OneToMany(() => ProgramaOrmEntity, (programa) => programa.area)
  programa!: ProgramaOrmEntity[];
  @OneToMany(() => UbicacionOrmEntity, (ubicacion) => ubicacion.area)
  ubicacion!: UbicacionOrmEntity[];
}
