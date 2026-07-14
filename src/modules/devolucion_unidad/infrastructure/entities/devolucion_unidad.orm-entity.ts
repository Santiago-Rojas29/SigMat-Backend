import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CondicionDevolucionUnidad } from '../../domain/entities/devolucion_unidad.entity';
import { DevolucionOrmEntity } from 'src/modules/devolucion/infrastructure/entities/devolucion.orm-entity';
import { UnidadOrmEntity } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';

@Entity('devolucion_unidad')
export class DevolucionUnidadOrmEntity {
  @PrimaryColumn('text')
  id_devolucion!: string;

  @ManyToOne(() => DevolucionOrmEntity, (devolucion) => devolucion.devolucionUnidad)
  @JoinColumn({ name: 'id_devolucion' })
  devolucion!: DevolucionOrmEntity;

  @PrimaryColumn('text')
  id_unidad!: string;

  @ManyToOne(() => UnidadOrmEntity, (unidad) => unidad.devolucionUnidad)
  @JoinColumn({ name: 'id_unidad' })
  unidad!: UnidadOrmEntity;

  @Column({ type: 'enum', enum: CondicionDevolucionUnidad })
  condicion_devolucion!: CondicionDevolucionUnidad;
}
