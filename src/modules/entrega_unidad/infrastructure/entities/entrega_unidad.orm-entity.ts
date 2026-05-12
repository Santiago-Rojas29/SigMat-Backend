import { Entity, PrimaryColumn } from 'typeorm';

@Entity('entrega_unidad')
export class EntregaUnidadOrmEntity {
  @PrimaryColumn('text')
  id_entrega!: string;

  @PrimaryColumn('text')
  id_unidad!: string;
}
