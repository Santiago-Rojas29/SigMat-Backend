import { AreaOrmEntity } from 'src/modules/area/infrastructure/entities/area.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

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

  @ManyToOne(() => AreaOrmEntity, (area) => area.ubicacion)
  @JoinColumn({ name: 'id_area' })
  area!: AreaOrmEntity;

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
