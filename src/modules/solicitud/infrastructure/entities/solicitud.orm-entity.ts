import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { SolicitudUnidadOrmEntity } from 'src/modules/solicitud_unidad/infrastructure/entities/solicitud_unidad.orm-entity';
import { SolicitudLoteOrmEntity } from 'src/modules/solicitud_lote/infrastructure/entities/solicitud_lote.orm-entity';
import { SolicitudAprendizOrmEntity } from 'src/modules/solicitud_aprendiz/infrastructure/entities/solicitud_aprendiz.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TipoFlujo, TipoPrestamo, EstadoSolicitud } from '../../domain/entities/solicitud.entity';

@Entity('solicitud')
export class SolicitudOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id_solicitud!: string;

  @Column()
  id_solicitante!: string;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'id_solicitante' })
  solicitante!: UsuarioOrmEntity;

  @Column({ type: 'enum', enum: TipoFlujo })
  tipo_flujo!: TipoFlujo;

  @Column({ type: 'enum', enum: TipoPrestamo })
  tipo_prestamo!: TipoPrestamo;

  @Column({ type: 'enum', enum: EstadoSolicitud, default: EstadoSolicitud.PENDIENTE_INSTRUCTOR })
  estado!: EstadoSolicitud;

  @Column({ nullable: true })
  id_instructor!: string | null;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_instructor' })
  instructor!: UsuarioOrmEntity | null;

  @Column({ nullable: true })
  id_admin!: string | null;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_admin' })
  admin!: UsuarioOrmEntity | null;

  @Column({ nullable: true })
  id_bodega!: string | null;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_bodega' })
  bodega!: UsuarioOrmEntity | null;

  @Column({ type: 'text', nullable: true })
  observaciones!: string | null;

  @Column({ type: 'text', nullable: true })
  motivo_rechazo!: string | null;

  @Column({ type: 'timestamp' })
  fecha_solicitud!: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_respuesta_instructor!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  fecha_respuesta_admin!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  fecha_respuesta_bodega!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  fecha_entrega!: Date | null;

  @OneToMany(() => SolicitudUnidadOrmEntity, (su) => su.solicitud)
  solicitudUnidad!: SolicitudUnidadOrmEntity[];

  @OneToMany(() => SolicitudLoteOrmEntity, (sl) => sl.solicitud)
  solicitudLote!: SolicitudLoteOrmEntity[];

  @OneToMany(() => SolicitudAprendizOrmEntity, (sa) => sa.solicitud)
  solicitudAprendiz!: SolicitudAprendizOrmEntity[];
}
