import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('entrega')
export class EntregaOrmEntity {
  @PrimaryGeneratedColumn()
  id_entrega!: number;

  @Column()
  id_prestamo!: number;

  @Column()
  id_encargado!: number;

  @Column({ type: 'timestamp' })
  fecha_entrega!: Date;

  @Column({ type: 'text' })
  observaciones!: string;
}
