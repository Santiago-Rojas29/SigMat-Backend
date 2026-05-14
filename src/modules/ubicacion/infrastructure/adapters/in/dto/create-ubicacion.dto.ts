import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUbicacionDto {
  @IsString()
  @IsNotEmpty()
  id_area!: string;

  @IsString()
  @IsNotEmpty()
  id_tipo_ubicacion!: string;

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
