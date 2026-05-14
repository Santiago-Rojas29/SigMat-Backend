import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  @PrimaryGeneratedColumn()
  id_ficha!: string;

  @Column()
  id_programa!: string;

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
}
