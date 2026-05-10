import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TipoIncidencia, EstadoIncidencia } from '../../domain/entities/incidencia.entity';

@Entity('incidencia')
export class IncidenciaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  id_unidad!: string;

  @Column('text')
  id_usuario!: string;

  @Column({ type: 'enum', enum: TipoIncidencia })
  tipo!: TipoIncidencia;

  @Column({ type: 'timestamp' })
  fecha_incidencia!: Date;

  @Column('text')
  descripcion!: string;

  @Column({ type: 'enum', enum: EstadoIncidencia })
  estado!: EstadoIncidencia;
}
