import { Entity, PrimaryColumn } from 'typeorm';

@Entity('rol_permisos')
export class RolPermisosOrmEntity {
  @PrimaryColumn('text')
  id_rol!: string;

  @PrimaryColumn('text')
  id_permiso!: string;
}
