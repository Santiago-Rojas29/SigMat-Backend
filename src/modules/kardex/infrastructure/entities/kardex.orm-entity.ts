import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TipoMovimiento } from '../../domain/entities/kardex.entity';

@Entity('kardex')
export class KardexOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: TipoMovimiento })
  tipo_movimiento!: TipoMovimiento;

  @Column('int')
  cantidad!: number;

  @Column({ type: 'timestamp' })
  fecha_movimiento!: Date;

  @Column('int')
  saldo!: number;

  @Column({ type: 'text', nullable: true })
  id_unidad!: string | null;

  @Column({ type: 'text', nullable: true })
  id_lote!: string | null;

  @Column({ type: 'text', nullable: true })
  id_entrega!: string | null;

  @Column({ type: 'text', nullable: true })
  id_devolucion!: string | null;

  @Column({ type: 'text', nullable: true })
  id_traslado!: string | null;

  @Column({ type: 'text', nullable: true })
  id_incidencia!: string | null;
}
