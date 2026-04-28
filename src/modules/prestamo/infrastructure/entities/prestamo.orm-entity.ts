import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('prestamo')
export class PrestamoOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
