import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('entrega')
export class EntregaOrmEntity {
  @PrimaryGeneratedColumn()
  id_entrega!: string;

  @Column()
  id_prestamo!: string;

  @Column()
  id_encargado!: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.entrega)
  @JoinColumn({ name: 'id_encargado'})
  usuario!: UsuarioOrmEntity;

  @Column({ type: 'timestamp' })
  fecha_entrega!: Date;

  @Column({ type: 'text' })
  observaciones!: string;
}
