import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { TipoDocumento, EstadoUsuario } from '../../domain/entities/usuario.entity';
import { IncidenciaOrmEntity } from 'src/modules/incidencia/infrastructure/entities/incidencia.orm-entity';
import { AreaOrmEntity } from 'src/modules/area/infrastructure/entities/area.orm-entity';
import { TrasladoOrmEntity } from 'src/modules/traslado/infrastructure/entities/traslado.orm-entity';
import { UnidadOrmEntity } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';
import { LoteOrmEntity } from 'src/modules/lote/infrastructure/entities/lote.orm-entity';
import { SolicitudUnidadOrmEntity } from 'src/modules/solicitud_unidad/infrastructure/entities/solicitud_unidad.orm-entity';
import { RolOrmEntity } from 'src/modules/rol/infrastructure/entities/rol.orm-entity';

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

  @Column({ type: 'varchar', length: 255, select: false })
  contrasena!: string;

  @OneToMany(() => IncidenciaOrmEntity, (incidencia) => incidencia.id_usuario)
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
}
