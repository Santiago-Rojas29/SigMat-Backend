import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rol')
export class RolOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  nombre!: string;

  @Column('text')
  descripcion!: string;
}
