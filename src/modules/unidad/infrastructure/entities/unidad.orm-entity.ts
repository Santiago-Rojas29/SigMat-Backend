import { TrasladoUnidadOrmEntity } from 'src/modules/traslado_unidad/infrastructure/entities/traslado_unidad.orm-entity';
import { UbicacionOrmEntity } from 'src/modules/ubicacion/infrastructure/entities/ubicacion.orm-entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { MaterialOrmEntity } from 'src/modules/material/infrastructure/entities/material.orm-entity';
import { EntregaUnidadOrmEntity } from 'src/modules/entrega_unidad/infrastructure/entities/entrega_unidad.orm-entity';
import { DevolucionUnidadOrmEntity } from 'src/modules/devolucion_unidad/infrastructure/entities/devolucion_unidad.orm-entity';
import { SolicitudUnidadOrmEntity } from 'src/modules/solicitud_unidad/infrastructure/entities/solicitud_unidad.orm-entity';
import { KardexOrmEntity } from 'src/modules/kardex/infrastructure/entities/kardex.orm-entity';
import { IncidenciaOrmEntity } from 'src/modules/incidencia/infrastructure/entities/incidencia.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

export enum EstadoUnidad {
  DISPONIBLE = 'disponible',
  PRESTADO = 'prestado',
  DANADO = 'danado',
  EN_MANTENIMIENTO = 'en mantenimiento',
  PERDIDO = 'perdido',
}

@Entity('unidad')
export class UnidadOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id_unidad!: string;

  @Column()
  id_material!: string;

  @ManyToOne(() => MaterialOrmEntity, (material) => material.unidades)
  @JoinColumn({ name: 'id_material' })
  material!: MaterialOrmEntity;

  @Column()
  id_responsable!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.unidad)
  @JoinColumn({ name: 'id_responsable' })
  usuario!: UsuarioOrmEntity;

  @Column()
  id_ubicacion!: string;

  @ManyToOne(() => UbicacionOrmEntity, (ubicacion) => ubicacion.unidad)
  @JoinColumn({ name: 'id_ubicacion' })
  ubicacion!: UbicacionOrmEntity;

  @Column({ length: 50 })
  codigo_unidad!: string;

  @Column({
    type: 'enum',
    enum: EstadoUnidad,
    default: EstadoUnidad.DISPONIBLE,
  })
  estado!: EstadoUnidad;

  @OneToMany(() => TrasladoUnidadOrmEntity, (trasladoUnidad) => trasladoUnidad.unidad)
  trasladoUnidad!: TrasladoUnidadOrmEntity[];

  @OneToMany(() => EntregaUnidadOrmEntity, (entregaUnidad) => entregaUnidad.unidad)
  entregaUnidad!: EntregaUnidadOrmEntity[];

  @OneToMany(() => DevolucionUnidadOrmEntity, (devolucionUnidad) => devolucionUnidad.unidad)
  devolucionUnidad!: DevolucionUnidadOrmEntity[];

  @OneToMany(() => SolicitudUnidadOrmEntity, (solicitudUnidad) => solicitudUnidad.unidad)
  solicitudUnidad!: SolicitudUnidadOrmEntity[];

  @OneToMany(() => KardexOrmEntity, (kardex) => kardex.unidad)
  kardex!: KardexOrmEntity[];

  @OneToMany(() => IncidenciaOrmEntity, (incidencia) => incidencia.unidad)
  incidencia!: IncidenciaOrmEntity[];
}
