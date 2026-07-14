import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { PermisosOrmEntity } from 'src/modules/permisos/infrastructure/entities/permisos.orm-entity';

@Unique(['id_usuario', 'id_permiso'])
@Entity('usuario_permisos')
export class UsuarioPermisosOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  id_usuario!: string;

  @ManyToOne(() => UsuarioOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario!: UsuarioOrmEntity;

  @Column('uuid')
  id_permiso!: string;

  @ManyToOne(() => PermisosOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_permiso' })
  permiso!: PermisosOrmEntity;

  @Column({ type: 'text', array: true, default: '{}' })
  submodulos!: string[];
}
