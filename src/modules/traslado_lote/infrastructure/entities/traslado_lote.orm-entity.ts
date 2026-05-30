import { LoteOrmEntity } from 'src/modules/lote/infrastructure/entities/lote.orm-entity';
import { TrasladoOrmEntity } from 'src/modules/traslado/infrastructure/entities/traslado.orm-entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('traslado_lote')
export class TrasladoLoteOrmEntity {
  @PrimaryColumn('text')
  id_traslado!: string;

  @PrimaryColumn('text')
  id_lote!: string;

  @ManyToOne(() => LoteOrmEntity, (loteTraslado) => loteTraslado.loteTraslado)
  @JoinColumn({ name: 'id_lote'})
  lote!: LoteOrmEntity;

  @ManyToOne(() => TrasladoOrmEntity, (traslado) => traslado.trasladoLote)
  @JoinColumn({ name: 'id_traslado' })
  traslado!: TrasladoOrmEntity;

  @Column('int')
  cantidad_trasladada!: number;
}
