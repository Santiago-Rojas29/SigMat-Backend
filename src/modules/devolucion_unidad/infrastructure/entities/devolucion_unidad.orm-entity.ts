import { Entity, Column, PrimaryColumn } from 'typeorm';
import { CondicionDevolucionUnidad } from '../../domain/entities/devolucion_unidad.entity';

@Entity('devolucion_unidad')
export class DevolucionUnidadOrmEntity {
  @PrimaryColumn('text')
  id_devolucion!: string;

  @PrimaryColumn('text')
  id_unidad!: string;

  @Column({ type: 'enum', enum: CondicionDevolucionUnidad })
  condicion_devolucion!: CondicionDevolucionUnidad;
}
