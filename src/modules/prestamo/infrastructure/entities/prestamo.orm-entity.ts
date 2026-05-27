import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { EstadoPrestamo } from '../../domain/entities/prestamo.entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { ValidacionOrmEntity } from 'src/modules/validacion/infrastructure/entities/validacion.orm-entity';
import { EntregaOrmEntity } from 'src/modules/entrega/infrastructure/entities/entrega.orm-entity';

@Entity('prestamo')
export class PrestamoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  id_usuario!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.prestamo)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: UsuarioOrmEntity;

  @Column('text')
  id_validacion!: string;

  @OneToOne(() => ValidacionOrmEntity, (validacion) => validacion.prestamo)
  @JoinColumn({ name: 'id_validacion' })
  validacion!: ValidacionOrmEntity;

  @Column({ type: 'timestamp' })
  fecha_limite!: Date;

  @Column({
    type: 'enum',
    enum: EstadoPrestamo,
    default: EstadoPrestamo.ACTIVO,
  })
  estado!: EstadoPrestamo;

  @OneToOne(() => EntregaOrmEntity, (entrega) => entrega.prestamo)
  entrega!: EntregaOrmEntity;
}
