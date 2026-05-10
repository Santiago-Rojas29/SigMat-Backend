import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { DecisionValidacion } from '../../domain/entities/validacion.entity';

@Entity('validacion')
export class ValidacionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  id_solicitud!: string;

  @Column('text')
  id_validador!: string;

  @Column({ type: 'timestamp' })
  fecha_validacion!: Date;

  @Column({ type: 'enum', enum: DecisionValidacion, default: DecisionValidacion.APROBADO })
  decision!: DecisionValidacion;

  @Column('text')
  observaciones!: string;
}
