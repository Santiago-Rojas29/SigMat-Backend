import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('solicitud_unidad')
export class SolicitudUnidadOrmEntity {
  @PrimaryColumn()
  id_solicitud!: number;

  @PrimaryColumn()
  id_unidad!: number;

  @Column()
  id_usuario!: number;
}
