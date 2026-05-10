import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('traslado_lote')
export class TrasladoLoteOrmEntity {
  @PrimaryColumn('text')
  id_traslado!: string;

  @PrimaryColumn('text')
  id_lote!: string;

  @Column('int')
  cantidad_trasladada!: number;
}
