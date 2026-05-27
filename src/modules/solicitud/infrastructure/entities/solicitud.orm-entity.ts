import { FichaOrmEntity } from 'src/modules/ficha/infrastructure/entities/ficha.orm-entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { SolicitudUnidadOrmEntity } from 'src/modules/solicitud_unidad/infrastructure/entities/solicitud_unidad.orm-entity';
import { SolicitudLoteOrmEntity } from 'src/modules/solicitud_lote/infrastructure/entities/solicitud_lote.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

export enum TipoPrestamo {
  INTERNO = 'interno',
  EXTERNO = 'externo',
}

export enum EstadoSolicitud {
  PENDIENTE = 'pendiente',
  APROBADO = 'aprobado',
  RECHAZADO = 'rechazado',
}

@Entity('solicitud')
export class SolicitudOrmEntity {
  @PrimaryGeneratedColumn()
  id_solicitud!: string;

  @Column()
  id_ficha!: string;

  @ManyToOne(() => FichaOrmEntity, (ficha) => ficha.solicitud)
  @JoinColumn({ name: 'id_ficha' })
  ficha!: FichaOrmEntity;

  @Column()
  id_solicitante!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.solicitud)
  @JoinColumn({ name: 'id_solicitante' })
  usuario!: UsuarioOrmEntity;

  @Column({ type: 'timestamp' })
  fecha_solicitud!: Date;

  @Column({
    type: 'enum',
    enum: TipoPrestamo,
  })
  tipo_prestamo!: TipoPrestamo;

  @Column({
    type: 'enum',
    enum: EstadoSolicitud,
    default: EstadoSolicitud.PENDIENTE,
  })
  estado!: EstadoSolicitud;

  @Column({ type: 'text' })
  observaciones!: string;

  @OneToMany(() => SolicitudUnidadOrmEntity, (solicitudUnidad) => solicitudUnidad.solicitud)
  solicitudUnidad!: SolicitudUnidadOrmEntity[];

  @OneToMany(() => SolicitudLoteOrmEntity, (solicitudLote) => solicitudLote.solicitud)
  solicitudLote!: SolicitudLoteOrmEntity[];
}
