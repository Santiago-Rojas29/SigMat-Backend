import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('entrega_lote')
export class EntregaLoteOrmEntity {
  @PrimaryColumn('text')
  id_entrega!: string;

  @PrimaryColumn('text')
  id_lote!: string;

  @Column('int')
  cantidad_entregada!: number;

  @Column('int')
  cantidad_devuelta!: number;
}
