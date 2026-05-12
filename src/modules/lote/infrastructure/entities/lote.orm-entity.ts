import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UnidadMedida {
  KG = 'kg',
  L = 'l',
  M = 'm',
  UNIDAD = 'unidad',
  PAQUETE = 'paquete',
}

@Entity('lote')
export class LoteOrmEntity {
  @PrimaryGeneratedColumn()
  id_lote!: number;

  @Column()
  id_material!: number;

  @Column()
  id_responsable!: number;

  @Column()
  id_ubicacion!: number;

  @Column({ length: 50 })
  codigo_lote!: string;

  @Column({ type: 'int' })
  cantidad_inicial!: number;

  @Column({ type: 'int' })
  cantidad_disponible!: number;

  @Column({
    type: 'enum',
    enum: UnidadMedida,
  })
  unidad_medida!: UnidadMedida;

  @Column({ type: 'date' })
  fecha_entrada!: Date;
}
