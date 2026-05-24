import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TipoDocumento, EstadoUsuario } from '../../domain/entities/usuario.entity';

@Entity('usuario')
export class UsuarioOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  id_rol!: string;

  @Column({ type: 'enum', enum: TipoDocumento })
  tipo_documento!: TipoDocumento;

  @Column({ type: 'varchar', length: 20 })
  numero_documento!: string;

  @Column({ type: 'varchar', length: 100 })
  nombres!: string;

  @Column({ type: 'varchar', length: 100 })
  apellidos!: string;

  @Column({ type: 'varchar', length: 100 })
  correo!: string;

  @Column({ type: 'varchar', length: 20 })
  telefono!: string;

  @Column({ type: 'enum', enum: EstadoUsuario })
  estado!: EstadoUsuario;

  @Column({ type: 'varchar', length: 255, select: false })
  contrasena!: string;
}
