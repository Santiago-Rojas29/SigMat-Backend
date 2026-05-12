import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('solicitud_lote')
export class SolicitudLoteOrmEntity {
  @PrimaryColumn()
  id_solicitud!: number;

  @PrimaryColumn()
  id_lote!: number;

  @Column({ type: 'int' })
  cantidad_solicitada!: number;

  @Column()
  id_usuario!: number;
}
