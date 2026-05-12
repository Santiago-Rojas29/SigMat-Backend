import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum EstadoSede {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity('sede')
export class SedeOrmEntity {
  @PrimaryGeneratedColumn()
  id_sede!: number;

  @Column()
  id_centro!: number;

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
}
