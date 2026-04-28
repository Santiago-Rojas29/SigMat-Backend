import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('validacion')
export class ValidacionOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
