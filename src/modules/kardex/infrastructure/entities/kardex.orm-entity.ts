import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TipoMovimiento } from '../../domain/entities/kardex.entity';
import { EntregaOrmEntity } from 'src/modules/entrega/infrastructure/entities/entrega.orm-entity';
import { DevolucionOrmEntity } from 'src/modules/devolucion/infrastructure/entities/devolucion.orm-entity';
import { UnidadOrmEntity } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';
import { LoteOrmEntity } from 'src/modules/lote/infrastructure/entities/lote.orm-entity';
import { TrasladoOrmEntity } from 'src/modules/traslado/infrastructure/entities/traslado.orm-entity';
import { IncidenciaOrmEntity } from 'src/modules/incidencia/infrastructure/entities/incidencia.orm-entity';

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

  @ManyToOne(() => UnidadOrmEntity, (unidad) => unidad.kardex)
  @JoinColumn({ name: 'id_unidad' })
  unidad!: UnidadOrmEntity | null;

  @Column({ type: 'text', nullable: true })
  id_lote!: string | null;

  @ManyToOne(() => LoteOrmEntity, (lote) => lote.kardex)
  @JoinColumn({ name: 'id_lote' })
  lote!: LoteOrmEntity | null;

  @Column({ type: 'text', nullable: true })
  id_entrega!: string | null;

  @ManyToOne(() => EntregaOrmEntity, (entrega) => entrega.kardex)
  @JoinColumn({ name: 'id_entrega' })
  entrega!: EntregaOrmEntity | null;

  @Column({ type: 'text', nullable: true })
  id_devolucion!: string | null;

  @ManyToOne(() => DevolucionOrmEntity, (devolucion) => devolucion.kardex)
  @JoinColumn({ name: 'id_devolucion' })
  devolucion!: DevolucionOrmEntity | null;

  @Column({ type: 'text', nullable: true })
  id_traslado!: string | null;

  @ManyToOne(() => TrasladoOrmEntity, (traslado) => traslado.kardex)
  @JoinColumn({ name: 'id_traslado' })
  traslado!: TrasladoOrmEntity | null;

  @Column({ type: 'text', nullable: true })
  id_incidencia!: string | null;

  @ManyToOne(() => IncidenciaOrmEntity, (incidencia) => incidencia.kardex)
  @JoinColumn({ name: 'id_incidencia' })
  incidencia!: IncidenciaOrmEntity | null;
}
