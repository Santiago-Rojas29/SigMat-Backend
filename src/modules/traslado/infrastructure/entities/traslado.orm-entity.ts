import { TrasladoLoteOrmEntity } from 'src/modules/traslado_lote/infrastructure/entities/traslado_lote.orm-entity';
import { TrasladoUnidadOrmEntity } from 'src/modules/traslado_unidad/infrastructure/entities/traslado_unidad.orm-entity';
import { UbicacionOrmEntity } from 'src/modules/ubicacion/infrastructure/entities/ubicacion.orm-entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('traslado')
export class TrasladoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  id_responsable!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.traslado)
  @JoinColumn({name: 'id_responsable' })
  id_usuario!: UsuarioOrmEntity;

  @Column('text')
  id_ubicacion_origen!: string;

  @ManyToOne(() => UbicacionOrmEntity, (ubicacion) => ubicacion.trasladoDestino)
  @JoinColumn({ name: 'id_ubicacion_destino' })
  ubicacionDestino!: UbicacionOrmEntity;

  @Column('text')
  id_ubicacion_destino!: string;

  @ManyToOne(() => UbicacionOrmEntity, (ubicacion) => ubicacion.trasladoDestino)
  @JoinColumn({ name: 'id_ubicacion_origen' })
  ubicacionOrigen!: UbicacionOrmEntity;

  @Column({ type: 'timestamp' })
  fecha_traslado!: Date;

  @Column('text')
  motivo!: string;

  @Column('text')
  observaciones!: string;
  @OneToMany(() => TrasladoUnidadOrmEntity, (trasladoUnidad) => trasladoUnidad.id_traslado)
  trasladoUnidad!: TrasladoUnidadOrmEntity[];
  @OneToMany(() => TrasladoLoteOrmEntity, (trasladoLote) => trasladoLote.id_lote)
  trasladoLote!: TrasladoLoteOrmEntity[];
}
