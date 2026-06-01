import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LoteOrmEntity } from 'src/modules/lote/infrastructure/entities/lote.orm-entity';
import { FichaOrmEntity } from 'src/modules/ficha/infrastructure/entities/ficha.orm-entity';

@Entity('lote_ficha')
export class LoteFichaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  id_lote!: string;

  @ManyToOne(() => LoteOrmEntity, (lote) => lote.loteFicha, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_lote' })
  lote!: LoteOrmEntity;

  @Column('uuid')
  id_ficha!: string;

  @ManyToOne(() => FichaOrmEntity, (ficha) => ficha.loteFicha, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_ficha' })
  ficha!: FichaOrmEntity;

  @Column({ type: 'int' })
  cantidad!: number;
}
