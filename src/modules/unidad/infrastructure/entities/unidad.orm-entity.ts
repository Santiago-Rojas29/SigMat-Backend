import { TrasladoUnidadOrmEntity } from 'src/modules/traslado_unidad/infrastructure/entities/traslado_unidad.orm-entity';
import { UbicacionOrmEntity } from 'src/modules/ubicacion/infrastructure/entities/ubicacion.orm-entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
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
  @PrimaryGeneratedColumn()
  id_unidad!: string;

  @Column()
  id_material!: string;

  @Column()
  id_responsable!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.unidad)
  @JoinColumn({ name: 'id_responsable' })
  id_usuario!: UsuarioOrmEntity;

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
  @OneToMany(() => TrasladoUnidadOrmEntity, (trasladoUnidad) => trasladoUnidad.id_unidad)
  trasladoUnidad!: TrasladoUnidadOrmEntity[];
}
