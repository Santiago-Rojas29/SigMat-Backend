import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum EstadoPrestamo {
  ACTIVO = 'activo',
  FINALIZADO = 'finalizado',
}

@Entity('prestamo')
export class PrestamoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  id_validacion!: string;

  @Column({ type: 'timestamp' })
  fecha_limite!: Date;

  @Column({
    type: 'enum',
    enum: EstadoPrestamo,
    default: EstadoPrestamo.ACTIVO,
  })
  estado!: EstadoPrestamo;
}
