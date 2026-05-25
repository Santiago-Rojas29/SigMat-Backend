import { UbicacionOrmEntity } from 'src/modules/ubicacion/infrastructure/entities/ubicacion.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum NombreTipoUbicacion {
  BODEGA = 'bodega',
  LABORATORIO = 'laboratorio',
  AULA = 'aula',
}

@Entity('tipo_ubicacion')
export class TipoUbicacionOrmEntity {
  @PrimaryGeneratedColumn()
  id_tipo_ubicacion!: string;

  @Column({
    type: 'enum',
    enum: NombreTipoUbicacion,
  })
  nombre!: NombreTipoUbicacion;

  @Column({ type: 'text' })
  descripcion!: string;
  @OneToMany(() => UbicacionOrmEntity, (ubicacion) => ubicacion.id_tipo_ubicacion)
  ubicacion!: UbicacionOrmEntity[];
}
