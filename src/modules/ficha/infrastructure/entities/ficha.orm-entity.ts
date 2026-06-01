import { FichaUsuarioOrmEntity } from 'src/modules/ficha_usuario/infrastructure/entities/ficha_usuario.orm-entity';
import { LoteFichaOrmEntity } from 'src/modules/lote_ficha/infrastructure/entities/lote_ficha.orm-entity';
import { ProgramaOrmEntity } from 'src/modules/programa/infrastructure/entities/programa.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import type { UnidadOrmEntity } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';

export enum Jornada {
  MANANA = 'manana',
  TARDE = 'tarde',
  NOCTURNA = 'nocturna',
}

export enum EstadoFicha {
  EN_FORMACION = 'en formacion',
  TERMINADA = 'terminada',
  CANCELADA = 'cancelada',
}

@Entity('ficha')
export class FichaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id_ficha!: string;

  @Column('uuid')
  id_programa!: string;

  @ManyToOne(() => ProgramaOrmEntity, (programa) => programa.ficha)
  @JoinColumn({ name: 'id_programa' })
  programa!: ProgramaOrmEntity;

  @Column({ length: 50 })
  codigo_ficha!: string;

  @Column({ type: 'date' })
  fecha_inicio!: Date;

  @Column({ type: 'date' })
  fecha_fin!: Date;

  @Column({
    type: 'enum',
    enum: Jornada,
  })
  jornada!: Jornada;

  @Column({
    type: 'enum',
    enum: EstadoFicha,
    default: EstadoFicha.EN_FORMACION,
  })
  estado!: EstadoFicha;
  @OneToMany(() => FichaUsuarioOrmEntity, (fichaUsuario) => fichaUsuario.ficha)
  fichaUsuario!: FichaUsuarioOrmEntity[];

  @OneToMany(() => LoteFichaOrmEntity, (lf) => lf.ficha)
  loteFicha!: LoteFichaOrmEntity[];

  @OneToMany('UnidadOrmEntity', (unidad: UnidadOrmEntity) => unidad.ficha)
  unidades!: UnidadOrmEntity[];
}
