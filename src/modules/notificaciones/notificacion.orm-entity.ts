import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TipoNotificacion {
  SOLICITUD_ESTADO  = 'solicitud_estado',
  NUEVA_SOLICITUD   = 'nueva_solicitud',
  NUEVA_DEVOLUCION  = 'nueva_devolucion',
  PRESTAMO_PROXIMO  = 'prestamo_proximo',
  PRESTAMO_VENCIDO  = 'prestamo_vencido',
  LOTE_VENCIMIENTO  = 'lote_vencimiento',
  STOCK_BAJO        = 'stock_bajo',
}

@Entity('notificacion')
export class NotificacionOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_notificacion' })
  id_notificacion: string;

  @Column({ name: 'id_usuario', type: 'varchar' })
  id_usuario: string;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column({ type: 'varchar', length: 200 })
  titulo: string;

  @Column({ type: 'text' })
  mensaje: string;

  @Column({ default: false })
  leida: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fecha_creacion: Date;

  @Column({ nullable: true, name: 'referencia_id', type: 'varchar' })
  referencia_id: string | null;

  @Column({ nullable: true, name: 'referencia_tipo', type: 'varchar', length: 50 })
  referencia_tipo: string | null;
}
