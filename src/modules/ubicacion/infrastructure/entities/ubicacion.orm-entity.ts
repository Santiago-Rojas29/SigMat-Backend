import { AreaOrmEntity } from 'src/modules/area/infrastructure/entities/area.orm-entity';
import { LoteOrmEntity } from 'src/modules/lote/infrastructure/entities/lote.orm-entity';
import { TipoUbicacionOrmEntity } from 'src/modules/tipo_ubicacion/infrastructure/entities/tipo_ubicacion.orm-entity';
import { TrasladoOrmEntity } from 'src/modules/traslado/infrastructure/entities/traslado.orm-entity';
import { UnidadOrmEntity } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

export enum EstadoUbicacion {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity('ubicacion')
export class UbicacionOrmEntity {
  @PrimaryGeneratedColumn()
  id_ubicacion!: string;

  @Column()
  id_area!: string;

  @ManyToOne(() => AreaOrmEntity, (area) => area.ubicacion)
  @JoinColumn({ name: 'id_area' })
  area!: AreaOrmEntity;

  @Column()
  id_tipo_ubicacion!: string;

  @ManyToOne(() => TipoUbicacionOrmEntity, (tipoUbicacion) => tipoUbicacion.ubicacion)
  @JoinColumn({ name: 'id_tipo_ubicacion' })
  tipoUbicacion!: TipoUbicacionOrmEntity;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({
    type: 'enum',
    enum: EstadoUbicacion,
    default: EstadoUbicacion.ACTIVO,
  })
  estado!: EstadoUbicacion;

  @Column({ type: 'uuid', nullable: true })
  id_encargado!: string | null;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_encargado' })
  encargado!: UsuarioOrmEntity | null;

  @OneToMany(() => TrasladoOrmEntity, (traslado) => traslado.ubicacionDestino)
  trasladoDestino!: TrasladoOrmEntity[];
  @OneToMany(() => TrasladoOrmEntity, (traslado) => traslado.ubicacionOrigen)
  trasladoOrigen!: TrasladoOrmEntity[];
  @OneToMany(() => UnidadOrmEntity, (unidad) => unidad.ubicacion)
  unidad!: UnidadOrmEntity[];
  @OneToMany(() => LoteOrmEntity, (lote) => lote.ubicacion)
  lote!: LoteOrmEntity[];
}
