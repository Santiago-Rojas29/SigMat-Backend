import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TipoIncidencia, EstadoIncidencia } from '../../domain/entities/incidencia.entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { UnidadOrmEntity } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';
import { KardexOrmEntity } from 'src/modules/kardex/infrastructure/entities/kardex.orm-entity';

@Entity('incidencia')
export class IncidenciaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  id_unidad!: string;

  @ManyToOne(() => UnidadOrmEntity, (unidad) => unidad.incidencia)
  @JoinColumn({ name: 'id_unidad' })
  unidad!: UnidadOrmEntity;

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

  @OneToMany(() => KardexOrmEntity, (kardex) => kardex.incidencia)
  kardex!: KardexOrmEntity[];
}
