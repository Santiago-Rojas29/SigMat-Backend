import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('entrega')
export class EntregaOrmEntity {
  @PrimaryGeneratedColumn()
  id_entrega!: string;

  @Column()
  id_prestamo!: string;

  @Column()
  id_encargado!: string;

  @Column({ type: 'timestamp' })
  fecha_entrega!: Date;

  @Column({ type: 'text' })
  observaciones!: string;
}
