import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CondicionDevolucion } from '../../domain/entities/devolucion.entity';

@Entity('devolucion')
export class DevolucionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  id_entrega!: string;

  @Column({ type: 'timestamp' })
  fecha_devolucion!: Date;

  @Column({ type: 'enum', enum: CondicionDevolucion })
  condicion!: CondicionDevolucion;

  @Column('text')
  observaciones!: string;
}
