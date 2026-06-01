import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LoteOrmEntity } from 'src/modules/lote/infrastructure/entities/lote.orm-entity';
import { FichaOrmEntity } from 'src/modules/ficha/infrastructure/entities/ficha.orm-entity';

@Entity('lote_ficha')
export class LoteFichaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  id_lote!: string;

  @ManyToOne(() => LoteOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_lote' })
  lote!: LoteOrmEntity;

  @Column('text')
  id_ficha!: string;

  @ManyToOne(() => FichaOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_ficha' })
  ficha!: FichaOrmEntity;

  @Column({ type: 'int' })
  cantidad!: number;
}
