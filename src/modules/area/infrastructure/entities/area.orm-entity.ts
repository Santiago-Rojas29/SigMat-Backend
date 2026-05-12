import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum EstadoArea {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity('area')
export class AreaOrmEntity {
  @PrimaryGeneratedColumn()
  id_area!: number;

  @Column()
  id_sede!: number;

  @Column()
  id_usuario!: number;

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
}
