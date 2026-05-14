import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  @PrimaryGeneratedColumn()
  id_programa!: string;

  @Column()
  id_area!: string;

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
}
