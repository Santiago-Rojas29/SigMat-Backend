import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum RolEnFicha {
  INSTRUCTOR = 'instructor',
  APRENDIZ = 'aprendiz',
}

@Entity('ficha_usuario')
export class FichaUsuarioOrmEntity {
  @PrimaryColumn()
  id_ficha!: number;

  @PrimaryColumn()
  id_usuario!: number;

  @Column({
    type: 'enum',
    enum: RolEnFicha,
  })
  rol_en_ficha!: RolEnFicha;
}
