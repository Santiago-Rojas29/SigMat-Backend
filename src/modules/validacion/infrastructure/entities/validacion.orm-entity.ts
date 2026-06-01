import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { DecisionValidacion } from '../../domain/entities/validacion.entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { PrestamoOrmEntity } from 'src/modules/prestamo/infrastructure/entities/prestamo.orm-entity';

@Entity('validacion')
export class ValidacionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  id_solicitud!: string;

  @Column('uuid')
  id_validador!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.validacion)
  @JoinColumn({ name: 'id_validador' })
  usuario!: UsuarioOrmEntity;

  @Column({ type: 'timestamp' })
  fecha_validacion!: Date;

  @Column({
    type: 'enum',
    enum: DecisionValidacion,
    default: DecisionValidacion.APROBADO,
  })
  decision!: DecisionValidacion;

  @Column('text')
  observaciones!: string;

  @OneToOne(() => PrestamoOrmEntity, (prestamo) => prestamo.validacion)
  prestamo!: PrestamoOrmEntity;
}
