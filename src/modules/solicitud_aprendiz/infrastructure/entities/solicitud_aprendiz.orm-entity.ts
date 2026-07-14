import { SolicitudOrmEntity } from 'src/modules/solicitud/infrastructure/entities/solicitud.orm-entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('solicitud_aprendiz')
export class SolicitudAprendizOrmEntity {
  @PrimaryColumn()
  id_solicitud!: string;

  @ManyToOne(() => SolicitudOrmEntity, (solicitud) => solicitud.solicitudAprendiz)
  @JoinColumn({ name: 'id_solicitud' })
  solicitud!: SolicitudOrmEntity;

  @PrimaryColumn()
  id_aprendiz!: string;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'id_aprendiz' })
  aprendiz!: UsuarioOrmEntity;
}
