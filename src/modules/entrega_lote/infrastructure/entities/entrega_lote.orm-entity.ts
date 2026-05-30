import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EntregaOrmEntity } from 'src/modules/entrega/infrastructure/entities/entrega.orm-entity';
import { LoteOrmEntity } from 'src/modules/lote/infrastructure/entities/lote.orm-entity';

@Entity('entrega_lote')
export class EntregaLoteOrmEntity {
  @PrimaryColumn('text')
  id_entrega!: string;

  @ManyToOne(() => EntregaOrmEntity, (entrega) => entrega.entregaLote)
  @JoinColumn({ name: 'id_entrega' })
  entrega!: EntregaOrmEntity;

  @PrimaryColumn('text')
  id_lote!: string;

  @ManyToOne(() => LoteOrmEntity, (lote) => lote.entregaLote)
  @JoinColumn({ name: 'id_lote' })
  lote!: LoteOrmEntity;

  @Column('int')
  cantidad_entregada!: number;

  @Column('int')
  cantidad_devuelta!: number;
}
