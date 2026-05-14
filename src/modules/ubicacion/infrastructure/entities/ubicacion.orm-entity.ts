import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum EstadoUbicacion {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity('ubicacion')
export class UbicacionOrmEntity {
  @PrimaryGeneratedColumn()
  id_ubicacion!: string;

  @Column()
  id_area!: string;

  @Column()
  id_tipo_ubicacion!: string;

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
