import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { PrestamoOrmEntity } from 'src/modules/prestamo/infrastructure/entities/prestamo.orm-entity';
import { DevolucionOrmEntity } from 'src/modules/devolucion/infrastructure/entities/devolucion.orm-entity';
import { EntregaUnidadOrmEntity } from 'src/modules/entrega_unidad/infrastructure/entities/entrega_unidad.orm-entity';
import { EntregaLoteOrmEntity } from 'src/modules/entrega_lote/infrastructure/entities/entrega_lote.orm-entity';
import { KardexOrmEntity } from 'src/modules/kardex/infrastructure/entities/kardex.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';

@Entity('entrega')
export class EntregaOrmEntity {
  @PrimaryGeneratedColumn()
  id_entrega!: string;

  @Column({ nullable: true })
  id_prestamo!: string | null;

  @OneToOne(() => PrestamoOrmEntity, (prestamo) => prestamo.entrega, { nullable: true })
  @JoinColumn({ name: 'id_prestamo' })
  prestamo!: PrestamoOrmEntity | null;

  @Column()
  id_encargado!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.entrega)
  @JoinColumn({ name: 'id_encargado'})
  usuario!: UsuarioOrmEntity;

  @Column({ type: 'timestamp' })
  fecha_entrega!: Date;

  @Column({ type: 'text' })
  observaciones!: string;

  @OneToOne(() => DevolucionOrmEntity, (devolucion) => devolucion.entrega)
  devolucion!: DevolucionOrmEntity;

  @OneToMany(() => EntregaUnidadOrmEntity, (entregaUnidad) => entregaUnidad.entrega)
  entregaUnidad!: EntregaUnidadOrmEntity[];

  @OneToMany(() => EntregaLoteOrmEntity, (entregaLote) => entregaLote.entrega)
  entregaLote!: EntregaLoteOrmEntity[];

  @OneToMany(() => KardexOrmEntity, (kardex) => kardex.entrega)
  kardex!: KardexOrmEntity[];
}
