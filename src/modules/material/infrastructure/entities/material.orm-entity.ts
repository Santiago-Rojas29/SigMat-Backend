import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CategoriaMaterial } from '../../domain/entities/material.entity';
import { UnidadOrmEntity } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';
import { LoteOrmEntity } from 'src/modules/lote/infrastructure/entities/lote.orm-entity';

@Entity('material')
export class MaterialOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  id_ficha!: string;

  @Column({ type: 'varchar', length: 150 })
  nombre!: string;

  @Column({ type: 'enum', enum: CategoriaMaterial })
  categoria!: CategoriaMaterial;

  @Column({ type: 'varchar', length: 50 })
  tipo!: string;

  @Column({ type: 'varchar', length: 50 })
  marca!: string;

  @Column({ type: 'varchar', length: 50 })
  modelo!: string;

  @Column('text')
  descripcion!: string;

  @Column({ type: 'varchar', length: 20 })
  codigo_unspsc!: string;

  @OneToMany(() => UnidadOrmEntity, (unidad) => unidad.material)
  unidades!: UnidadOrmEntity[];

  @OneToMany(() => LoteOrmEntity, (lote) => lote.material)
  lotes!: LoteOrmEntity[];
}
