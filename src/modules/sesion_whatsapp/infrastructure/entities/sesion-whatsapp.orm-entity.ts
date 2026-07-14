import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('sesion_whatsapp')
export class SesionWhatsappOrmEntity {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  telefono!: string;

  @Column({ type: 'text', nullable: true })
  token!: string | null;

  @Column({ type: 'varchar', length: 50, default: 'esperando_correo' })
  paso!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  correo!: string | null;

  @Column({ type: 'uuid', nullable: true, name: 'id_usuario' })
  id_usuario!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombres!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  apellidos!: string | null;

  @Column({ type: 'uuid', nullable: true, name: 'id_rol' })
  id_rol!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre_rol!: string | null;

  @Column({ type: 'text', array: true, nullable: true })
  acciones_inventario!: string[] | null;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizado_en!: Date;
}
