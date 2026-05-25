import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { TipoDocumento, EstadoUsuario } from '../../domain/entities/usuario.entity';
import { IncidenciaOrmEntity } from 'src/modules/incidencia/infrastructure/entities/incidencia.orm-entity';
import { AreaOrmEntity } from 'src/modules/area/infrastructure/entities/area.orm-entity';
import { TrasladoOrmEntity } from 'src/modules/traslado/infrastructure/entities/traslado.orm-entity';
import { UnidadOrmEntity } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';
import { LoteOrmEntity } from 'src/modules/lote/infrastructure/entities/lote.orm-entity';
import { SolicitudUnidadOrmEntity } from 'src/modules/solicitud_unidad/infrastructure/entities/solicitud_unidad.orm-entity';
import { RolOrmEntity } from 'src/modules/rol/infrastructure/entities/rol.orm-entity';
import { FichaUsuarioOrmEntity } from 'src/modules/ficha_usuario/infrastructure/entities/ficha_usuario.orm-entity';
import { SolicitudLoteOrmEntity } from 'src/modules/solicitud_lote/infrastructure/entities/solicitud_lote.orm-entity';
import { SolicitudOrmEntity } from 'src/modules/solicitud/infrastructure/entities/solicitud.orm-entity';
import { ValidacionOrmEntity } from 'src/modules/validacion/infrastructure/entities/validacion.orm-entity';
import { EntregaOrmEntity } from 'src/modules/entrega/infrastructure/entities/entrega.orm-entity';

@Entity('usuario')
export class UsuarioOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  id_rol!: string;

  @ManyToOne(() => RolOrmEntity, (rol) => rol.usuario)
  @JoinColumn({ name: 'id_rol' })
  rol!: RolOrmEntity;

  @Column({ type: 'enum', enum: TipoDocumento })
  tipo_documento!: TipoDocumento;

  @Column({ type: 'varchar', length: 20 })
  numero_documento!: string;

  @Column({ type: 'varchar', length: 100 })
  nombres!: string;

  @Column({ type: 'varchar', length: 100 })
  apellidos!: string;

  @Column({ type: 'varchar', length: 100 })
  correo!: string;

  @Column({ type: 'varchar', length: 20 })
  telefono!: string;

  @Column({ type: 'enum', enum: EstadoUsuario })
  estado!: EstadoUsuario;
  @OneToMany(() => IncidenciaOrmEntity, (encidencia) => encidencia.id_usuario)
  incidencia!: IncidenciaOrmEntity[];
  @OneToMany(() => AreaOrmEntity, (area) => area.id_usuario)
  area!: AreaOrmEntity[];
  @OneToMany(() => TrasladoOrmEntity, (traslado) => traslado.id_responsable)
  traslado!: TrasladoOrmEntity[];
  @OneToMany(() => UnidadOrmEntity, (unidad) => unidad.id_responsable)
  unidad!: UnidadOrmEntity[];
  @OneToMany(() => LoteOrmEntity, (lote) => lote.id_responsable)
  lote!: LoteOrmEntity[];
  @OneToMany(() => SolicitudUnidadOrmEntity, (solicitudUnidad) => solicitudUnidad.id_usuario)
  solicitudUnidad!: SolicitudUnidadOrmEntity[];
  @OneToMany(() => FichaUsuarioOrmEntity, (fichaUsuario) => fichaUsuario.id_usuario)
  fichaUsuario!: FichaUsuarioOrmEntity[];
  @OneToMany(() => SolicitudLoteOrmEntity, (solicitudLote) => solicitudLote.id_usuario)
  solicitudLote!: SolicitudLoteOrmEntity[];
  @OneToMany(() => SolicitudOrmEntity, (solicitud) => solicitud.id_solicitante)
  solicitud!: SolicitudOrmEntity[];
  @OneToMany(() => ValidacionOrmEntity, (validacion) => validacion.id_validador)
  validacion!: ValidacionOrmEntity[];
  @OneToMany(() => EntregaOrmEntity, (entrega) => entrega.id_encargado)
  entrega!: EntregaOrmEntity[];
  
}
