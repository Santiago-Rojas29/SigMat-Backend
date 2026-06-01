import { LoteFichaOrmEntity } from 'src/modules/lote_ficha/infrastructure/entities/lote_ficha.orm-entity';
import { TrasladoLoteOrmEntity } from 'src/modules/traslado_lote/infrastructure/entities/traslado_lote.orm-entity';
import { UbicacionOrmEntity } from 'src/modules/ubicacion/infrastructure/entities/ubicacion.orm-entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { MaterialOrmEntity } from 'src/modules/material/infrastructure/entities/material.orm-entity';
import { EntregaLoteOrmEntity } from 'src/modules/entrega_lote/infrastructure/entities/entrega_lote.orm-entity';
import { SolicitudLoteOrmEntity } from 'src/modules/solicitud_lote/infrastructure/entities/solicitud_lote.orm-entity';
import { KardexOrmEntity } from 'src/modules/kardex/infrastructure/entities/kardex.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { EstadoLote } from '../../domain/entities/lote.entity';


@Entity('lote')
export class LoteOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id_lote!: string;

  @Column()
  id_material!: string;

  @ManyToOne(() => MaterialOrmEntity, (material) => material.lotes)
  @JoinColumn({ name: 'id_material' })
  material!: MaterialOrmEntity;

  @Column()
  id_responsable!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.lote)
  @JoinColumn({ name: 'id_responsable'})
  usuario!: UsuarioOrmEntity;

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

  @Column({ type: 'varchar', length: 20 })
  unidad_medida!: string;

  @Column({ type: 'date' })
  fecha_entrada!: Date;

  @Column({ type: 'date', nullable: true })
  fecha_ingreso!: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_vencimiento!: Date | null;

  @Column({ type: 'enum', enum: EstadoLote, nullable: true })
  estado!: EstadoLote | null;

  @OneToMany(() => TrasladoLoteOrmEntity, (loteTraslado) => loteTraslado.lote)
  loteTraslado!: TrasladoLoteOrmEntity[];

  @OneToMany(() => EntregaLoteOrmEntity, (entregaLote) => entregaLote.lote)
  entregaLote!: EntregaLoteOrmEntity[];

  @OneToMany(() => SolicitudLoteOrmEntity, (solicitudLote) => solicitudLote.lote)
  solicitudLote!: SolicitudLoteOrmEntity[];

  @OneToMany(() => KardexOrmEntity, (kardex) => kardex.lote)
  kardex!: KardexOrmEntity[];

  @OneToMany(() => LoteFichaOrmEntity, (lf) => lf.lote)
  loteFicha!: LoteFichaOrmEntity[];
}
