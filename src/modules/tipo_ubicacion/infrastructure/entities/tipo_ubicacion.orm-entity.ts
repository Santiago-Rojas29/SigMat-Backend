import { UbicacionOrmEntity } from 'src/modules/ubicacion/infrastructure/entities/ubicacion.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('tipo_ubicacion')
export class TipoUbicacionOrmEntity {
  @PrimaryGeneratedColumn()
  id_tipo_ubicacion!: string;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'text' })
  descripcion!: string;
  @OneToMany(() => UbicacionOrmEntity, (ubicacion) => ubicacion.tipoUbicacion)
  ubicacion!: UbicacionOrmEntity[];
}
