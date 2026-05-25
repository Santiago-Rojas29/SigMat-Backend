import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('solicitud_unidad')
export class SolicitudUnidadOrmEntity {
  @PrimaryColumn()
  id_solicitud!: string;

  @PrimaryColumn()
  id_unidad!: string;

  @Column()
  id_usuario!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.solicitudUnidad)
  @JoinColumn({ name: 'id_usuario' })
  usuarioUnidad!: UsuarioOrmEntity;
}
