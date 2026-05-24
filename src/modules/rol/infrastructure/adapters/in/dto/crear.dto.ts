import { IsNotEmpty, IsString } from 'class-validator';

export class CrearRolDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;
}
