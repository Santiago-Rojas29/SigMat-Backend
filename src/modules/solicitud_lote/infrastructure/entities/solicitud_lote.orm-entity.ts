import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { SolicitudOrmEntity } from 'src/modules/solicitud/infrastructure/entities/solicitud.orm-entity';
import { LoteOrmEntity } from 'src/modules/lote/infrastructure/entities/lote.orm-entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('solicitud_lote')
export class SolicitudLoteOrmEntity {
  @PrimaryColumn()
  id_solicitud!: string;

  @ManyToOne(() => SolicitudOrmEntity, (solicitud) => solicitud.solicitudLote)
  @JoinColumn({ name: 'id_solicitud' })
  solicitud!: SolicitudOrmEntity;

  @PrimaryColumn()
  id_lote!: string;

  @ManyToOne(() => LoteOrmEntity, (lote) => lote.solicitudLote)
  @JoinColumn({ name: 'id_lote' })
  lote!: LoteOrmEntity;

  @Column({ type: 'int' })
  cantidad_solicitada!: number;

  @Column()
  id_usuario!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.solicitudLote)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: UsuarioOrmEntity;
}
