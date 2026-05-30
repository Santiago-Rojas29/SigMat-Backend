import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { CondicionDevolucion } from '../../domain/entities/devolucion.entity';
import { EntregaOrmEntity } from 'src/modules/entrega/infrastructure/entities/entrega.orm-entity';
import { DevolucionUnidadOrmEntity } from 'src/modules/devolucion_unidad/infrastructure/entities/devolucion_unidad.orm-entity';
import { KardexOrmEntity } from 'src/modules/kardex/infrastructure/entities/kardex.orm-entity';

@Entity('devolucion')
export class DevolucionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  id_entrega!: string;

  @OneToOne(() => EntregaOrmEntity, (entrega) => entrega.devolucion)
  @JoinColumn({ name: 'id_entrega' })
  entrega!: EntregaOrmEntity;

  @Column({ type: 'timestamp' })
  fecha_devolucion!: Date;

  @Column({ type: 'enum', enum: CondicionDevolucion })
  condicion!: CondicionDevolucion;

  @Column('text')
  observaciones!: string;

  @OneToMany(() => DevolucionUnidadOrmEntity, (devolucionUnidad) => devolucionUnidad.devolucion)
  devolucionUnidad!: DevolucionUnidadOrmEntity[];

  @OneToMany(() => KardexOrmEntity, (kardex) => kardex.devolucion)
  kardex!: KardexOrmEntity[];
}
