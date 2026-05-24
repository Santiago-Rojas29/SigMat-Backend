import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CategoriaMaterial } from '../../domain/entities/material.entity';

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
}
