import { RolPermisosOrmEntity } from 'src/modules/rol_permisos/infrastructure/entities/rol_permisos.orm-entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('rol')
export class RolOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  nombre!: string;

  @Column('text')
  descripcion!: string;
  @OneToMany(() => UsuarioOrmEntity, (usuario) => usuario.id_rol)
  usuario!: UsuarioOrmEntity[];
  @OneToMany(() => RolPermisosOrmEntity, (rolPermiso) => rolPermiso.id_rol)
  rolPermiso!: RolPermisosOrmEntity[];
}
