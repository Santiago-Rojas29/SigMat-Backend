import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSedeDto {
  @IsString()
  @IsNotEmpty()
  id_centro!: string;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  direccion!: string;

  @IsString()
  @IsNotEmpty()
  telefono!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;
}
