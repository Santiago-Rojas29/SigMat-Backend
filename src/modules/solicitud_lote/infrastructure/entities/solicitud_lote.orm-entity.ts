import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('solicitud_lote')
export class SolicitudLoteOrmEntity {
  @PrimaryColumn()
  id_solicitud!: string;

  @PrimaryColumn()
  id_lote!: string;

  @Column({ type: 'int' })
  cantidad_solicitada!: number;

  @Column()
  id_usuario!: string;
}
