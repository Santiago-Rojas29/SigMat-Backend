import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CategoriaMaterial } from '../../domain/entities/material.entity';
import { UnidadOrmEntity } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';
import { LoteOrmEntity } from 'src/modules/lote/infrastructure/entities/lote.orm-entity';

@Entity('material')
export class MaterialOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 150 })
  nombre!: string;

  @Column({ type: 'enum', enum: CategoriaMaterial })
  categoria!: CategoriaMaterial;

  @Column({ type: 'varchar', length: 50 })
  tipo!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  marca!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  modelo!: string | null;

  @Column('text')
  descripcion!: string;

  @Column({ type: 'varchar', length: 20 })
  codigo_unspsc!: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  unidad_medida!: string | null;

  @OneToMany(() => UnidadOrmEntity, (unidad) => unidad.material)
  unidades!: UnidadOrmEntity[];

  @OneToMany(() => LoteOrmEntity, (lote) => lote.material)
  lotes!: LoteOrmEntity[];
}
