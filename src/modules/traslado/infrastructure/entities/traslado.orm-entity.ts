import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('traslado')
export class TrasladoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  id_responsable!: string;

  @Column('text')
  id_ubicacion_origen!: string;

  @Column('text')
  id_ubicacion_destino!: string;

  @Column({ type: 'timestamp' })
  fecha_traslado!: Date;

  @Column('text')
  motivo!: string;

  @Column('text')
  observaciones!: string;
}
