import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('centro')
export class CentroOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name: string = '';

  @Column()
  ciudad: string = '';

  @Column()
  direccion: string = '';

  @Column()
  telefono: string = '';

  @Column()
  estado: string = '';
}
