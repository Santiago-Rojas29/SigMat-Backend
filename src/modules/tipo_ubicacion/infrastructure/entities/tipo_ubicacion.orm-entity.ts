import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
