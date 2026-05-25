import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUnidadDto {
  @IsString()
  @IsNotEmpty()
  id_material!: string;

  @IsString()
  @IsNotEmpty()
  id_responsable!: string;

  @IsString()
  @IsNotEmpty()
  id_ubicacion!: string;

  @IsString()
  @IsNotEmpty()
  codigo_unidad!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;
}
