import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum EstadoUbicacion {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity('ubicacion')
export class UbicacionOrmEntity {
  @PrimaryGeneratedColumn()
  id_ubicacion!: number;

  @Column()
  id_area!: number;

  @Column()
  id_tipo_ubicacion!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({
    type: 'enum',
    enum: EstadoUbicacion,
    default: EstadoUbicacion.ACTIVO,
  })
  estado!: EstadoUbicacion;
}
