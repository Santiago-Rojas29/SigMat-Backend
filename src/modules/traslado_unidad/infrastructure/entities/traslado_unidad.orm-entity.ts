import { TrasladoOrmEntity } from 'src/modules/traslado/infrastructure/entities/traslado.orm-entity';
import { UnidadOrmEntity } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('traslado_unidad')
export class TrasladoUnidadOrmEntity {
  @PrimaryColumn('text')
  id_traslado!: string;

  @ManyToOne(() => TrasladoOrmEntity, (traslado) => traslado.trasladoUnidad)
  @JoinColumn({ name: 'id_traslado'})
  traslado!: TrasladoOrmEntity;

  @PrimaryColumn('text')
  id_unidad!: string;

  @ManyToOne(() => UnidadOrmEntity, (unidad) => unidad.trasladoUnidad)
  @JoinColumn({ name: 'id_unidad' })
  unidad!: UnidadOrmEntity;

}
