import { Entity, PrimaryColumn } from 'typeorm';

@Entity('traslado_unidad')
export class TrasladoUnidadOrmEntity {
  @PrimaryColumn('text')
  id_traslado!: string;

  @PrimaryColumn('text')
  id_unidad!: string;
}
