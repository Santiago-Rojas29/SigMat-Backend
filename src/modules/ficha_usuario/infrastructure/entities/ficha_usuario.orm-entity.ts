import { FichaOrmEntity } from 'src/modules/ficha/infrastructure/entities/ficha.orm-entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum RolEnFicha {
  INSTRUCTOR = 'instructor',
  APRENDIZ = 'aprendiz',
}

@Entity('ficha_usuario')
export class FichaUsuarioOrmEntity {
  @PrimaryColumn()
  id_ficha!: string;

  @ManyToOne(() => FichaOrmEntity, (ficha) => ficha.fichaUsuario)
  @JoinColumn({ name: 'id_ficha' })
  ficha!: FichaOrmEntity;

  @PrimaryColumn()
  id_usuario!: string;

  @Column({
    type: 'enum',
    enum: RolEnFicha,
  })
  rol_en_ficha!: RolEnFicha;
}
