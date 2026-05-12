import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoUbicacionDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;
}
