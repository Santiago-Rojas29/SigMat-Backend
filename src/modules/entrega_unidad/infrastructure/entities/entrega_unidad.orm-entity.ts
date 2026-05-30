import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EntregaOrmEntity } from 'src/modules/entrega/infrastructure/entities/entrega.orm-entity';
import { UnidadOrmEntity } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';

@Entity('entrega_unidad')
export class EntregaUnidadOrmEntity {
  @PrimaryColumn('text')
  id_entrega!: string;

  @ManyToOne(() => EntregaOrmEntity, (entrega) => entrega.entregaUnidad)
  @JoinColumn({ name: 'id_entrega' })
  entrega!: EntregaOrmEntity;

  @PrimaryColumn('text')
  id_unidad!: string;

  @ManyToOne(() => UnidadOrmEntity, (unidad) => unidad.entregaUnidad)
  @JoinColumn({ name: 'id_unidad' })
  unidad!: UnidadOrmEntity;
}
