import { PermisosOrmEntity } from 'src/modules/permisos/infrastructure/entities/permisos.orm-entity';
import { RolOrmEntity } from 'src/modules/rol/infrastructure/entities/rol.orm-entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('rol_permisos')
export class RolPermisosOrmEntity {
  @PrimaryColumn('text')
  id_rol!: string;

  @ManyToOne(() => RolOrmEntity, (rol) => rol.rolPermiso)
  @JoinColumn({ name: 'id_rol'})
  rol!: RolOrmEntity;

  @PrimaryColumn('text')
  id_permiso!: string;

  @ManyToOne(() => PermisosOrmEntity, (permiso) => permiso.rolPermiso)
  @JoinColumn({ name: 'id_permiso'})
  permiso!: PermisosOrmEntity;
}
