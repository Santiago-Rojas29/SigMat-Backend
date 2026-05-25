import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('solicitud_unidad')
export class SolicitudUnidadOrmEntity {
  @PrimaryColumn()
  id_solicitud!: string;

  @PrimaryColumn()
  id_unidad!: string;

  @Column()
  id_usuario!: string;
}
