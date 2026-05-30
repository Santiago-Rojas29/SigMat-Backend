import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ModuloPermiso } from '../../domain/entities/permisos.entity';
import { RolPermisosOrmEntity } from 'src/modules/rol_permisos/infrastructure/entities/rol_permisos.orm-entity';

@Entity('permisos')
export class PermisosOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  nombre!: string;

  @Column('text')
  descripcion!: string;

  @Column({ type: 'enum', enum: ModuloPermiso })
  modulo!: ModuloPermiso;
  @OneToMany(() => RolPermisosOrmEntity, (rolPermiso) => rolPermiso.permiso)
  rolPermiso!: RolPermisosOrmEntity[];
}
