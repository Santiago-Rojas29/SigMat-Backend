import { TrasladoLoteOrmEntity } from 'src/modules/traslado_lote/infrastructure/entities/traslado_lote.orm-entity';
import { UbicacionOrmEntity } from 'src/modules/ubicacion/infrastructure/entities/ubicacion.orm-entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

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
  id_lote!: string;

  @Column()
  id_material!: string;

  @Column()
  id_responsable!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.lote)
  @JoinColumn({ name: 'id_responsable'})
  id_usuario!: UsuarioOrmEntity

  @Column()
  id_ubicacion!: string;

  @ManyToOne(() => UbicacionOrmEntity, (ubicacion) => ubicacion.lote)
  @JoinColumn({ name: 'id_ubicacion' })
  ubicacion!: UbicacionOrmEntity;

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
  @OneToMany(() => TrasladoLoteOrmEntity, (loteTraslado) => loteTraslado.id_lote)
  loteTraslado!: TrasladoLoteOrmEntity[];
}
