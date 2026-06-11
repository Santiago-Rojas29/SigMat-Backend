import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { RolOrmEntity }      from 'src/modules/rol/infrastructure/entities/rol.orm-entity';
import { PermisosOrmEntity } from 'src/modules/permisos/infrastructure/entities/permisos.orm-entity';

@Unique(['id_rol', 'id_permiso'])
@Entity('rol_permisos')
export class RolPermisosOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  id_rol!: string;

  @ManyToOne(() => RolOrmEntity, (rol) => rol.rolPermiso, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_rol' })
  rol!: RolOrmEntity;

  @Column('uuid')
  id_permiso!: string;

  @ManyToOne(() => PermisosOrmEntity, (permiso) => permiso.rolPermiso, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_permiso' })
  permiso!: PermisosOrmEntity;

  @Column({ type: 'text', array: true, default: '{}' })
  submodulos!: string[];

  @Column({ type: 'text', array: true, default: '{}' })
  acciones!: string[];
}
