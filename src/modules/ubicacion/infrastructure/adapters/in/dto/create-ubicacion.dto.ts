import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUbicacionDto {
  @IsNumber()
  @IsNotEmpty()
  id_area!: number;

  @IsNumber()
  @IsNotEmpty()
  id_tipo_ubicacion!: number;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;
}
