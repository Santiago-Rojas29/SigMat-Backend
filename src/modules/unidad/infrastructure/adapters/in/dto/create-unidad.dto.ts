import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUnidadDto {
  @IsNumber()
  @IsNotEmpty()
  id_material!: number;

  @IsNumber()
  @IsNotEmpty()
  id_responsable!: number;

  @IsNumber()
  @IsNotEmpty()
  id_ubicacion!: number;

  @IsString()
  @IsNotEmpty()
  codigo_unidad!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;
}
