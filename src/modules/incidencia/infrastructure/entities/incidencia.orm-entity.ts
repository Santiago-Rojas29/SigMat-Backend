import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TipoIncidencia, EstadoIncidencia } from '../../domain/entities/incidencia.entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';

@Entity('incidencia')
export class IncidenciaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  id_unidad!: string;

  @Column('text')
  id_usuario!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.incidencia)
  @JoinColumn({ name: 'id_usuario'})
  usuario!: UsuarioOrmEntity;

  @Column({ type: 'enum', enum: TipoIncidencia })
  tipo!: TipoIncidencia;

  @Column({ type: 'timestamp' })
  fecha_incidencia!: Date;

  @Column('text')
  descripcion!: string;

  @Column({ type: 'enum', enum: EstadoIncidencia })
  estado!: EstadoIncidencia;
}
