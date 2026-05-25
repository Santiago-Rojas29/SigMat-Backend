import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('solicitud_lote')
export class SolicitudLoteOrmEntity {
  @PrimaryColumn()
  id_solicitud!: string;

  @PrimaryColumn()
  id_lote!: string;

  @Column({ type: 'int' })
  cantidad_solicitada!: number;

  @Column()
  id_usuario!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.solicitudLote)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: UsuarioOrmEntity;
}
