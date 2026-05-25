import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SedeOrmEntity } from '../../../sede/infrastructure/entities/sede.orm-entity';

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

  @OneToMany(() => SedeOrmEntity, (sede) => sede.centro)
  sedes!: SedeOrmEntity[];
}
