import { FichaOrmEntity } from 'src/modules/ficha/infrastructure/entities/ficha.orm-entity';
import { UsuarioOrmEntity } from 'src/modules/usuario/infrastructure/entities/usuario.orm-entity';
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

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.fichaUsuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: UsuarioOrmEntity;

  @Column({
    type: 'enum',
    enum: RolEnFicha,
  })
  rol_en_ficha!: RolEnFicha;
}
