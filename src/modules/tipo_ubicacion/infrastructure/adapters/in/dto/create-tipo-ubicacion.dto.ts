import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoUbicacionDto {
  @IsString()
  @IsNotEmpty()
  id_tipo_ubicacion!: string;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;
}
