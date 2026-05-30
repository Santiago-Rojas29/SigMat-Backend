import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { SolicitudOrmEntity } from 'src/modules/solicitud/infrastructure/entities/solicitud.orm-entity';
import { UnidadOrmEntity } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('solicitud_unidad')
export class SolicitudUnidadOrmEntity {
  @PrimaryColumn()
  id_solicitud!: string;

  @ManyToOne(() => SolicitudOrmEntity, (solicitud) => solicitud.solicitudUnidad)
  @JoinColumn({ name: 'id_solicitud' })
  solicitud!: SolicitudOrmEntity;

  @PrimaryColumn()
  id_unidad!: string;

  @ManyToOne(() => UnidadOrmEntity, (unidad) => unidad.solicitudUnidad)
  @JoinColumn({ name: 'id_unidad' })
  unidad!: UnidadOrmEntity;

  @Column()
  id_usuario!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.solicitudUnidad)
  @JoinColumn({ name: 'id_usuario' })
  usuarioUnidad!: UsuarioOrmEntity;
}
