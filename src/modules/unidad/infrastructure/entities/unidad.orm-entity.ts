import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum EstadoUnidad {
  DISPONIBLE = 'disponible',
  PRESTADO = 'prestado',
  DANADO = 'danado',
  EN_MANTENIMIENTO = 'en mantenimiento',
  PERDIDO = 'perdido',
}

@Entity('unidad')
export class UnidadOrmEntity {
  @PrimaryGeneratedColumn()
  id_unidad!: number;

  @Column()
  id_material!: number;

  @Column()
  id_responsable!: number;

  @Column()
  id_ubicacion!: number;

  @Column({ length: 50 })
  codigo_unidad!: string;

  @Column({
    type: 'enum',
    enum: EstadoUnidad,
    default: EstadoUnidad.DISPONIBLE,
  })
  estado!: EstadoUnidad;
}
