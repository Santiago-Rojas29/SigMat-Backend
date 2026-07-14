import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEntregaUnidadDto {
  @IsString()
  @IsNotEmpty()
  id_entrega!: string;

  @IsString()
  @IsNotEmpty()
  id_unidad!: string;
}
